export default {
  clear: (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined => {
    promptValue = '';
    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  backspace: (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined => {
    if (cursorInfo.selectionStart === 0) {
      return;
    }
    const strBeforeCursor = promptValue.substring(0, cursorInfo.selectionStart - 1);
    const strAfterCursor = promptValue.substring(cursorInfo.selectionStart);
    promptValue = strBeforeCursor + strAfterCursor;
    cursorInfo.selectionStart--;
    cursorInfo.selectionEnd--;
    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  insert: (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined => {
    if (!action.data) {
      console.warn('No data to insert!');
      return;
    }

    console.log(cursorInfo)

    // Split the string to part before selection and the part after it
    // Note that this omits the selection content.
    const strStart = promptValue.substring(0, cursorInfo.selectionStart);
    const strEnd = promptValue.substring(cursorInfo.selectionEnd, promptValue.length);

    console.log(strStart, strEnd);

    // Insert value at the cursor position
    promptValue = strStart + action.data + strEnd;

    // Adjust cursor position
    cursorInfo.selectionStart = cursorInfo.selectionStart + 1;
    cursorInfo.selectionEnd = cursorInfo.selectionStart + 1;
    cursorInfo.selectionContent = '';
    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },
};
