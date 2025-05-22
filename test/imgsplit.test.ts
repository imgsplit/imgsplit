import {expect} from 'vitest'
import {imgsplit,ouputDataType} from "../src";
import {createTest} from "./utils";


createTest('with height default', async (inputDir: string): Promise<ouputDataType[]> => {
    const arr = await imgsplit(`${inputDir}test.jpg`);
    expect(arr.length).toBe(16);

    return arr;

});

createTest('with height custom', async (inputDir: string): Promise<ouputDataType[]> => {
    const arr = await imgsplit(`${inputDir}test.jpg`, 500);
    expect(arr.length).toBe(9);

    return arr;

});

createTest('with count', async (inputDir: string): Promise<ouputDataType[]> => {
    const arr = await imgsplit({
        src: `${inputDir}test.jpg`,
        count: 5
    });
    expect(arr.length).toBe(5);

    return arr;

});

createTest('with items option', async (inputDir: string): Promise<ouputDataType[]> => {
    const arr = await imgsplit({
        src: `${inputDir}test.jpg`,
        items: [
            {y: 0, height: 256},
            {y: 256, height: 512},
            {y: 768, height: 1024},
            {y: 1792, height: 2048},
            {y: 3840, height: 256},
        ]
    });
    expect(arr.length).toBe(5);

    return arr;

});

