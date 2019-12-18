import { useHistory } from "react-router-dom";

export function route(path = '') {
    useHistory().push(path);
}