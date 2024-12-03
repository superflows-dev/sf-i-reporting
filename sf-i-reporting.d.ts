/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
import { DataObject, AddButtonObject } from './dataObjects';
/**
 * SfIReporting element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
export declare class SfIReporting extends LitElement {
    apiId: string;
    projectid: string;
    projectname: string;
    configjson: string;
    getConfigJson: () => any;
    prepopulateValJson: string;
    getPrepopulateJson: () => any;
    mode: string;
    flow: string;
    name: string;
    ignoreprojections: string;
    editdisable: string;
    getIgnoreProjections: () => any;
    dataModel: any[];
    list: any[];
    _SfReporting: any;
    selectedItem: any;
    selectedItemIds: any;
    static styles: import("lit").CSSResult;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfRowNotif: any;
    _SfRowNotifMessage: any;
    _SfLoader: any;
    _SfIReportingC: any;
    _SfReportingContainer: any;
    _SfReportingContainerShort: any;
    _SfReportingButtonContainer: any;
    _SfReportingButtonSubmit: any;
    _SfReportingButtonSubmitConfirm: any;
    _SfReportingButtonSubmitCancel: any;
    _SfReportingButtonEdit: any;
    _SfReportingButtonEditCancel: any;
    _SfReportingButtonDelete: any;
    _SfReportingButtonDeleteCancel: any;
    _SfReportingButtonDeleteConfirm: any;
    _SfReportingButtonNew: any;
    _SfReportingButtonBack: any;
    _SfDecryptContainer: any;
    _SfDecryptProjectInput: any;
    _SfDecryptFileInput: any;
    _SfDecryptButton: any;
    decryptProjectId: string;
    decryptFileName: string;
    constructor();
    truncate: (str: string, n: number, useWordBoundary: boolean) => string;
    selectedValues: () => {
        [key: string]: any;
    };
    submitClick: () => void;
    submitCancelClick: () => void;
    submitConfirmClick: () => void;
    editClick: () => void;
    editCancelClick: () => void;
    newClick: () => void;
    backClick: () => void;
    deleteClick: () => void;
    deleteCancelClick: () => void;
    deleteConfirmClick: () => void;
    initListeners: () => void;
    initListListeners: () => void;
    initNewListeners: () => void;
    initDetailsListeners: () => void;
    initEditListeners: () => void;
    populateDataModel: () => void;
    populateView: (scrollTopTarget?: number) => void;
    prepopulateValues: () => void;
    evalShowProgress: () => void;
    evalTimeout: any;
    initInputListeners: () => void;
    initSectionListeners: () => void;
    renderAddSection: (addObj: AddButtonObject, iter: number) => string;
    renderSectionContainer: (addObj: AddButtonObject) => string;
    renderAddButton: (addObj: AddButtonObject) => string;
    renderElement: (dataObj: DataObject) => string;
    populateViewShort: () => void;
    populateList: () => void;
    loadMode: () => Promise<void>;
    prepareXhrPresignedGet: (url: string, loaderElement: any, loaderText?: string) => Promise<unknown>;
    prepareXhrPresignedDelete: (url: string, loaderElement: any, loaderText?: string) => Promise<unknown>;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    fetchPresignedUrl: (url: string) => Promise<any>;
    fetchPresignedUrlDelete: (url: string) => Promise<any>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    setNotif: (msg: string) => void;
    fetchSchema: () => Promise<void>;
    fetchList: () => Promise<void>;
    fetchDetails: () => Promise<void>;
    submitNew: () => Promise<void>;
    submitEdit: () => Promise<void>;
    submitDelete: () => Promise<void>;
    submitPublish: () => Promise<void>;
    initDecryptView: () => void;
    initDecryptListeners: () => void;
    evalDecrypt: () => void;
    submitDecrypt: () => Promise<void>;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-reporting': SfIReporting;
    }
}
//# sourceMappingURL=sf-i-reporting.d.ts.map