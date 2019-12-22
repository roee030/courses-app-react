import { useHistory } from "react-router-dom";
import { element } from "prop-types";

export function route(path = '') {
    useHistory().push(path);
}

export function getUnSavedArrayElements(array = [], state = {}) {
    return array.filter(element => state[element]);
}

export function getValuesFromStateByArray(state = {}, array = []) {
    return array.map(element => state[element]);
}