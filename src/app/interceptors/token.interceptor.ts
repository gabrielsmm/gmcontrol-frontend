import {HttpInterceptorFn} from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    const jwtToken = req.clone({
        setHeaders: {
            Authorization: `${token}`
        }
    });

    return next(jwtToken);
};
