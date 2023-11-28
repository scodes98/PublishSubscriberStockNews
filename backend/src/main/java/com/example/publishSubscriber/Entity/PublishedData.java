package com.example.publishSubscriber.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "publishedData")
public class PublishedData {

    @Id
    private String id;
    private String publishMasterId;
    private String publishSector;
    private String publishMessage;
    private boolean fetchedForBroker; // New column

    // Constructors
    public PublishedData() {
        // Default constructor
        this.fetchedForBroker = false; // Set the default value to false
    }

    public PublishedData(String id, String publishMasterId, String publishSector, String publishMessage, boolean fetchedForBroker) {
        this.id = id;
        this.publishMasterId = publishMasterId;
        this.publishSector = publishSector;
        this.publishMessage = publishMessage;
        this.fetchedForBroker = false;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPublishMasterId() {
        return publishMasterId;
    }

    public void setPublishMasterId(String publishMasterId) {
        this.publishMasterId = publishMasterId;
    }

    public String getPublishSector() {
        return publishSector;
    }

    public void setPublishSector(String publishSector) {
        this.publishSector = publishSector;
    }

    public String getPublishMessage() {
        return publishMessage;
    }

    public void setPublishMessage(String publishMessage) {
        this.publishMessage = publishMessage;
    }

    public boolean isFetchedForBroker() {
        return fetchedForBroker;
    }

    public void setFetchedForBroker(boolean fetchedForBroker) {
        this.fetchedForBroker = fetchedForBroker;
    }

    // Other methods...
}