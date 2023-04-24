type ButtonAction = {
  type: 'clear' | 'backspace' | 'insert' | 'wrap' | 'evaluate';
  data?: string; // For use in 'wrap' type transform, see comment on it's implementation
  options?: {
    wrapSelectedExpression?: boolean; // Will wrap the selection in `()` if something is selected
    moveCursorInsideExpressionIfEmpty?: boolean; // Moves cursor to $ instead of & after transform, if *nothing* is selected
  };
};
