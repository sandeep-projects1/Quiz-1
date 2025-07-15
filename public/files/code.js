Sub ExportQuestionsToJSWithCustomPromptColumnE()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Sheet1") ' Update sheet name if needed

    ' Sort by Category (Col A) and Points (Col B)
    With ws.Sort
        .SortFields.Clear
        .SortFields.Add Key:=ws.Range("A2:A100"), Order:=xlAscending
        .SortFields.Add Key:=ws.Range("B2:B100"), Order:=xlAscending
        .SetRange ws.Range("A1:F100") ' Includes up to column F now
        .Header = xlYes
        .Apply
    End With

    Dim output As String
    output = "import {" & vbCrLf & _
             "  IMAGE_STYLE," & vbCrLf & _
             "  VIDEO_STYLE," & vbCrLf & _
             "  DIALOGUE_STYLE," & vbCrLf & _
             "  EMOJI_STYLE," & vbCrLf & _
             "} from './config';" & vbCrLf & vbCrLf & _
             "export const questions = {" & vbCrLf

    Dim i As Long
    For i = 2 To ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
        Dim cat, pts, qType, qPath, promptText, ans, qText As String
        cat = ws.Cells(i, 1)
        pts = ws.Cells(i, 2)
        qType = LCase(Trim(ws.Cells(i, 3)))
        qPath = ws.Cells(i, 4)
        promptText = Trim(ws.Cells(i, 5)) ' Column E
        ans = ws.Cells(i, 6) ' Column F

        If promptText = "" Then
            Select Case qType
                Case "image": promptText = "Guess the character"
                Case "audio": promptText = "Guess the sound"
                Case "video": promptText = "Guess the scene"
            End Select
        End If

        Select Case qType
            Case "image"
                qText = "<img src=""" & qPath & """ style=""${BIG_IMAGE_STYLE}"" />
" & promptText
            Case "audio"
                qText = "<audio controls src=""" & qPath & """></audio>
" & promptText
            Case "video"
                qText = "<video controls src=""" & qPath & """ style=""${BIG_IMAGE_STYLE}""></video>
" & promptText
            Case Else
                qText = qPath ' Assuming text questions are plain strings
        End Select

        output = output & "  'Category " & cat & "-" & pts & "': {" & vbCrLf & _
                 "    type: '" & qType & "'," & vbCrLf & _
                 "    q: `" & qText & "`," & vbCrLf & _
                 "    a: '" & ans & "'" & vbCrLf & _
                 "  }," & vbCrLf
    Next i

    output = output & "};"

    ' Export to file
    Dim fso As Object, ts As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set ts = fso.CreateTextFile(ThisWorkbook.Path & "\questions.js", True)
    ts.Write output
    ts.Close

    MsgBox "JS file with custom display prompts exported successfully!"
End Sub


 