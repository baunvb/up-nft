import {call, all} from 'redux-saga/effects';
import walletSaga from './WalletSaga';

export default function* rootSaga() {
    yield all([walletSaga()])
}