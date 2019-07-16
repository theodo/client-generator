import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import list, { {{titleUcFirst}}ListAction, {{titleUcFirst}}ListState } from './list';
import create, { {{titleUcFirst}}CreateAction, {{titleUcFirst}}CreateState } from './create';
import update, { {{titleUcFirst}}UpdateAction, {{titleUcFirst}}UpdateState } from './update';
import del, { {{titleUcFirst}}DeleteAction, {{titleUcFirst}}DeleteState } from './delete';
import show, { {{titleUcFirst}}ShowAction, {{titleUcFirst}}ShowState } from './show';

export type {{titleUcFirst}}Action = ActionType<{{titleUcFirst}}ListAction | {{titleUcFirst}}CreateAction | {{titleUcFirst}}UpdateAction | {{titleUcFirst}}DeleteAction | {{titleUcFirst}}ShowAction >;


export type {{titleUcFirst}}State = Readonly<{
    list: {{titleUcFirst}}ListState;
    create: {{titleUcFirst}}CreateState;
    update: {{titleUcFirst}}UpdateState;
    del: {{titleUcFirst}}DeleteState;
    show: {{titleUcFirst}}ShowState;
}>;


export default combineReducers({ list, create, update, del, show });