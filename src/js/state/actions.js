define([
], function () {
    'use strict';
    const AUTHENTICATE = 'AUTHENTICATE';
    const requestAuth = function () {
        return {
            type: 'REQUEST_AUTHENTICATION',
        };
    }
    const authenticateUser = async (username, password) => {

        const res = await fetch('http://localhost:8080/auth', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ username, password })
        })
        if (res.status === 200) {
            return await res.json();
        } else {
            return Promise.reject(await res.json());
        }
    }

    const authSuccess = () => {
        return {
            type: 'AUTHENTICATION_SUCCESS'
        }
    }
    const authFailure = () => {
        return {
            type: 'AUTHENTICATION_FAILURE'
        }
    }
    const authAction = function (username, password) {
        return (dispatch) => {
            dispatch(requestAuth());
            return authenticateUser(username, password)
                .then(res => {
                    return dispatch(authSuccess())
                }).catch(err => {
                    return dispatch(authFailure())
                });
        }
    }
    const requestingLov = () => {
        return {
            type: 'REQUESTING_LOV'
        }
    }

    const receivedLov = (lovs) => {
        return {
            type: 'RECEIVED_LOV',
            payload: lovs
        }
    }
    const failedLov = (err) => {
        return {
            type: 'FAILED_LOV',
            payload: err
        }
    }

    const fetchLov = async () => {
        const res = await fetch('http://localhost:8080/lov', {
            method: 'GET'
        })
        if (res.status === 200) {
            return await res.json();
        } else {
            return Promise.reject(await res.json());
        }
    }
    const getLov = (state) => (dispatch) => {
        let shouldFetch = true;
        if (state.lov.timestamp) {
            const diff = new Date().getTime() - state.lov.timestamp;
            if (diff / 10000 < 1) {
                shouldFetch = false;
            }
        }
        if (shouldFetch) {
            dispatch(requestingLov());
            fetchLov().then(res => {
                dispatch(receivedLov(res))
            }).catch(err => {
                dispatch(failedLov(err))
            })
        }

    }
    return {
        AUTHENTICATE: authAction,
        LOV: getLov
    }

});