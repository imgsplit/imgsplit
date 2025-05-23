/**
 * [en] item options
 *      x & width is optional
 *
 * [zh] 分割项
 *      x 和 width 为可选项
 *
 */
export type ImgSplitItemOption = {
    x?: number,
    y: number,
    width?: number,
    height: number
}

/**
 * [en] ImgSplitOption
 *
 * [zh] 分割参数
 *
 */
export type ImgSplitOption = {
    src: Buffer | string
    /**
     * @default 256
     */
    height?: number,
    count?: number,
    /**
     * @default true
     */
    forceOuputDataURL?: boolean,
    items?: ImgSplitItemOption[]
}
/**
 * [en] ouputdata
 *
 * [zh] 输出结果
 *
 */
export type ouputDataType = ImgSplitItemOption & {

    /**
     * base64
     */
    dataURL?: string;
    /**
     * [en] for browser
     * [zh] 浏览器中输出
     */
    blob?: Blob;
    /**
     * [en] for nodejs
     * [zh] node环境输出
     */
    buffer?: Buffer;
}

export * from './imgsplit';