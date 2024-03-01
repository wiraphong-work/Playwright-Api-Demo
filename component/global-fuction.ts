import { test, expect, Page } from '@playwright/test';

export class MainPage {

    async checkKeyOfJson( responseBody: JSON ,arr: any[]) {
       await arr.forEach((val)=>{
        expect(responseBody).toHaveProperty(val);
        })
    }
}  