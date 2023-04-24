/**
 * @file TransformationHelper.ts
 * @brief Transformation helper object indexed by the action type.
 * @author Martin Brázda
 */
const TransformationHelper = {
  /**
   * @brief Clears the prompt value and moves the cursor to the beginning.
   * @param action: ButtonAction
   * @param cursorInfo: CursorInfo
   * @param promptValue: String
   * 
   * @returns { cursorInfo: CursorInfo; promptValue: string }
    */
  clear: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    promptValue = '';
    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  /**
   * @brief Deletes one character before the cursor.
   * @param action: ButtonAction
   * @param cursorInfo: CursorInfo
   * @param promptValue: String
   * 
   * @returns { cursorInfo: CursorInfo; promptValue: string }
   */
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

      promptValue = strStart + strEnd;
      cursorInfo.selectionEnd = cursorInfo.selectionStart;
    }

    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  /**
   * @brief takes in the action.data and inserts it at the cursor position, then moves cursor after what has been inserted.
   * @param action: ButtonAction
   * @param cursorInfo: CursorInfo
   * @param promptValue: String
   * 
   * @returns { cursorInfo: CursorInfo; promptValue: string }
   */
  insert: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    if (action.data === undefined) {
      console.warn('No data to insert!');
      return;
    }

    action.data = action.data.toString();

    // Split the string to part before selection and the part after it
    // Note that this omits the selection content.
    const strStart = promptValue.substring(0, cursorInfo.selectionStart);
    const strEnd = promptValue.substring(cursorInfo.selectionEnd, promptValue.length);

    // Insert value at the cursor position
    promptValue = strStart + action.data + strEnd;

    console.log(action.data, action.data.length);

    // Adjust cursor position
    cursorInfo.selectionStart = cursorInfo.selectionStart + action.data.length;
    cursorInfo.selectionEnd = cursorInfo.selectionStart + action.data.length;
    cursorInfo.selectionContent = '';
    cursorInfo.refocus = true;

    return {
      cursorInfo,
      promptValue
    };
  },

  /**
   * @brief takes in action.data and replaces $ with selected text and moves cursor accordingly.
   * @param action: ButtonAction
   * @param cursorInfo: CursorInfo
   * @param promptValue: String
   * 
   * @returns { cursorInfo: CursorInfo; promptValue: string }
   */
  wrap: function (action: ButtonAction, cursorInfo: CursorInfo, promptValue: string): { cursorInfo: CursorInfo; promptValue: string } | undefined {
    /**
     * action.data contains template string where:
     *  - `$` signifies the selected expression (empty string will be substituted if nothing is selected)
     *  - `&` signifies the cursor position after the transformation. This can be overwritten using the
     *        action.options.moveCursorInsideExpressionIfEmpty, which will move the cursor to $ instead if nothing is selected
     */
    if (action.data === undefined) {
      console.warn('No wrap syntax!');
      return;
    }

    // We are modifying the the action and cursorInfo in this method, so we make a local copy of it first and use that
    const _action = JSON.parse(JSON.stringify(action));
    const _cursorInfo = JSON.parse(JSON.stringify(cursorInfo));

    if (
      action.options?.wrapSelectedExpression && // wrapSelectedExpression is enabled
      cursorInfo.selectionStart !== cursorInfo.selectionEnd // and nothing is selected
    ) {
      _action.data = _action.data.replaceAll('$', `(${cursorInfo.selectionContent})`);
    } else {
      _action.data = _action.data.replaceAll('$', cursorInfo.selectionContent);
    }

    const insertRetVal = TransformationHelper.insert(_action, _cursorInfo, promptValue);

    if (!insertRetVal) {
      return;
    }

    let expressionOffset = insertRetVal.promptValue.lastIndexOf('&');
    insertRetVal.promptValue = insertRetVal.promptValue.replaceAll('&', '');

    if (
      action.options?.moveCursorInsideExpressionIfEmpty && // If moveCursorInsideExpressionIfEmpty is enabled
      cursorInfo.selectionStart === cursorInfo.selectionEnd // and nothing is selected
    ) {
      expressionOffset = insertRetVal.cursorInfo.selectionStart + action.data.replaceAll('&', '').lastIndexOf('$') - 1;
    }

    insertRetVal.cursorInfo.selectionStart = expressionOffset;
    insertRetVal.cursorInfo.selectionEnd = expressionOffset;

    return insertRetVal;
  },
};

export default TransformationHelper;
