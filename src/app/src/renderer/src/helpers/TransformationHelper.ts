const TransformationHelper = {
  clear: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    promptValue = '';
    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  backspace: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    if (cursorInfo.selectionStart === cursorInfo.selectionEnd) {
      if (cursorInfo.selectionStart === 0) {
        return;
      }

      const strBeforeCursor = promptValue.substring(0, cursorInfo.selectionStart - 1);
      const strAfterCursor = promptValue.substring(cursorInfo.selectionStart);
      promptValue = strBeforeCursor + strAfterCursor;
      cursorInfo.selectionStart--;
      cursorInfo.selectionEnd--;
    } else {
      const strStart = promptValue.substring(0, cursorInfo.selectionStart);
      const strEnd = promptValue.substring(cursorInfo.selectionEnd, promptValue.length);

      console.log(strStart, strEnd);
      promptValue = strStart + strEnd;
      cursorInfo.selectionEnd = cursorInfo.selectionStart;
    }

    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  insert: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    if (action.data === undefined) {
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

  /**
   * action.data contains template string where:
   *  - `$` signifies the selected expression (empty string will be substituted if nothing is selected)
   *  - `&` signifies the cursor position after the transformation. This can be overwritten using the
   *        action.options.moveCursorInsideExpressionIfEmpty, which will move the cursor to $ instead if nothing is selected
   */
  wrap: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    if (action.data === undefined) {
      console.warn('No wrap syntax!');
      return;
    }

    // We are modifying the the action in this method, so we make a local copy of it first
    const _action = JSON.parse(JSON.stringify(action));
    const _cursorInfo = JSON.parse(JSON.stringify(cursorInfo));

    console.log(_action.data, cursorInfo.selectionContent);

    if (
      cursorInfo.selectionStart !== cursorInfo.selectionEnd &&
      action.options?.wrapSelectedExpression
    ) {
      _action.data = _action.data.replaceAll('$', `(${cursorInfo.selectionContent})`);
    } else {
      _action.data = _action.data.replaceAll('$', cursorInfo.selectionContent);
    }

    console.log(_action.data, this);

    const insertRetVal = TransformationHelper.insert(_action, _cursorInfo, promptValue);

    if (!insertRetVal) {
      return;
    }

    let expressionOffset = insertRetVal.promptValue.lastIndexOf('&');
    insertRetVal.promptValue = insertRetVal.promptValue.replaceAll('&', '');

    console.log(cursorInfo.selectionStart, cursorInfo.selectionEnd);

    if (action.options?.moveCursorInsideExpressionIfEmpty && cursorInfo.selectionStart === cursorInfo.selectionEnd) {
      expressionOffset = insertRetVal.cursorInfo.selectionStart + action.data.replaceAll('&', '').lastIndexOf('$') - 1;
      console.log(`Expression empty, moving to it. ${expressionOffset}`);
    }

    insertRetVal.cursorInfo.selectionStart = expressionOffset;
    insertRetVal.cursorInfo.selectionEnd = expressionOffset;

    return insertRetVal;
  },
};

export default TransformationHelper;
