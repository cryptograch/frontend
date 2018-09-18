export const GLOBALVIEW_OPEN = 'GLOBALVIEW_SHOW';
export const GLOBALVIEW_ADDROUTE = 'GLOBALVIEW_ADDROUTE';
export const GLOBALVIEW_CLOSE = 'GLOBALVIEW_CLOSE';

export const openGoogleMap = (center = { lat: 49.14, lng: 28.28 }, labels = []) => ({
    type: GLOBALVIEW_OPEN,
    show: 'map',
    data: {
        center,
        labels
    }
})

export const addMapRoute = (route) => ({
    type: GLOBALVIEW_ADDROUTE,
    route,
});

export const openImage = (url) => ({
    type: GLOBALVIEW_OPEN,
    show: 'image',
    data: { url }
});

export const close = () => ({
    type: GLOBALVIEW_CLOSE
});