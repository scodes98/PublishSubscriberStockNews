export const BASE_URL = 'http://localhost:8080/api/v1/';

export const PUBLISHER = 'publisher/';
export const PUBLISHER_LOGIN_URL =  BASE_URL + PUBLISHER + 'validatePublisher';
export const PUBLISHER_GET_TOPIC = BASE_URL + PUBLISHER + 'fetchPublishMaster'; // GET TOPICS
export const PUBLISHER_PUBLISH_DATA = BASE_URL + PUBLISHER + 'publishData';  //POST MESSAGES BY PUBLISHER
export const PUBLISHER_GET_MESSAGES_BY_TOPIC = BASE_URL + PUBLISHER + 'fetchMappedDataForSubscriber' // GET MESSAGES BY TOPIC FOR SUBSCRIBER

export const SUBSCRIBER = 'subscriber/';
export const SUBCRIBER_LOGIN_URL = BASE_URL + SUBSCRIBER + 'validateSubscriber';
