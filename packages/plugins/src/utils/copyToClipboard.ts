export const isClipboardSupported = () => navigator.clipboard ?? false;
export const isClipboardCommandSupported = () =>
  document.queryCommandSupported("copy") ?? false;

/**
 * 인자로 받은 텍스트를 클립보드에 복사합니다.
 *
 * @param {string} message - message: 클립보드에 복사할 내용
 * @returns {Promise<boolean>} promise 객체
 * @example
 * ```ts
 *   const isSuccessed = await copyToClipboard(message);
 *
 *   if(isSuccessed){
 *    console.log('Copy message successfully');
 *   } else {
 *    console.log('Failed to copy message');
 *   }
 * ```
 */
export default function copyToClipboard(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        return resolve(true);
      })
      .catch(() => {
        if (!isClipboardCommandSupported()) {
          return resolve(false);
        }

        const shadowTextArea = document.createElement("textarea");
        document.body.appendChild(shadowTextArea);
        shadowTextArea.value = message;
        shadowTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(shadowTextArea);

        return resolve(true);
      });
  });
}
