export interface FetchDataWithCoord{
    name: string;
    sys: {
        country: string;
    };
    list: [{
        dt: number;
        main: {
            temp: number;
            humidity: number;
            temp_min: number;
            temp_max: number;
        };
        weather: [{
            description: string;
            icon: string;
        }];
    }];
    dt: number;
    main: {
        temp: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    weather: [{
        description: string;
        icon: string;
    }];
    city: {
        coord: {
            lat: number;
            lon: number;
        };
        name: string;
        country: string;
    }
}
interface dateTime {
    dt: number;
}
export interface WeatherDataMinAndMax extends dateTime{
    temp_max: number;
    temp_min: number;
}
export interface WeatherData extends WeatherDataMinAndMax{
    humidity: string;
    icon: string;
}
export interface WeatherDataHourly extends dateTime{
    temp: number;
}
export interface DailyData {
    [key: number]: WeatherData;
}