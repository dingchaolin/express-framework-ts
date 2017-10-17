/**
 * Created by chaolinding on 2017/10/16.
 */

export interface HtmlTdk{
    title:string;
    keyword:string;
    description:string;
}

export interface EjsViewData {
    tdk:HtmlTdk;
    test?:string;
}

