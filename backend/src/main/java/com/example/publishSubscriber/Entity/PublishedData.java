package com.example.publishSubscriber.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "publishedData")
public class PublishedData {

    @Id
    private String id;
    private String publishMasterId; // Assuming publishMasterId is the non-primary key column
    private String publishSector;
    private String publishMessage;

    // Constructors
    public PublishedData() {
        // Default constructor
    }

    public PublishedData(String id, String publishMasterId, String publishSector, String publishMessage) {
        this.id = id;
        this.publishMasterId = publishMasterId;
        this.publishSector = publishSector;
        this.publishMessage = publishMessage;
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

    // Other methods...
}
