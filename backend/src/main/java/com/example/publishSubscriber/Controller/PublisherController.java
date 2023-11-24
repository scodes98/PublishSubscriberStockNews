package com.example.publishSubscriber.Controller;

import com.example.publishSubscriber.Entity.PublishMaster;
import com.example.publishSubscriber.Entity.PublishedData;
import com.example.publishSubscriber.Entity.Publisher;
import com.example.publishSubscriber.Model.PublishSectorRequest;
import com.example.publishSubscriber.Model.ValidationResponse;
import com.example.publishSubscriber.Service.PublishMasterService;
import com.example.publishSubscriber.Service.PublishedDataService;
import com.example.publishSubscriber.Service.PublisherService;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/publisher")
public class PublisherController {

    @Autowired
    private PublisherService publisherService;
    @Autowired
    private PublishMasterService publishMasterService;
    @Autowired
    private PublishedDataService publishedDataService;

    @PostMapping("/registerPublisher")
    public ResponseEntity<ValidationResponse> registerPublisher(@RequestBody Publisher credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
    
        // Check if the username already exists
        if (publisherService.getPublisherByUsername(username) != null) {
            String errorMessage = "Conflict: Username already exists";
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ValidationResponse(HttpStatus.CONFLICT.value(), errorMessage));
        }
    
        // Create a new publisher and save it to the database
        Publisher newPublisher = new Publisher(username, password);
        publisherService.savePublisher(newPublisher);
    
        String successMessage = "Success: Publisher registered successfully";
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ValidationResponse(HttpStatus.CREATED.value(), successMessage));
    }
    
    @GetMapping("/validatePublisher")
    public ResponseEntity<ValidationResponse> validatePublisher(@RequestBody Publisher credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
    
        if (publisherService.validatePublisherCredentials(username, password)) {
            return ResponseEntity.ok(new ValidationResponse(HttpStatus.OK.value(), "Success: Publisher credentials are valid"));
        } else {
            Publisher publisher = publisherService.getPublisherByUsername(username);
            if (publisher != null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ValidationResponse(HttpStatus.UNAUTHORIZED.value(), "Unauthorized: Incorrect password"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ValidationResponse(HttpStatus.NOT_FOUND.value(), "Not Found: Publisher not found"));
            }
        }
    }

    @PostMapping("/dumpPublishMaster")
    public ResponseEntity<ValidationResponse> dumpPublishMaster(@RequestBody PublishSectorRequest request) {
        List<String> publishSectors = request.getPublishSectors();
        publishMasterService.insertPublishSectors(publishSectors);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ValidationResponse(HttpStatus.CREATED.value(), "Published sectors inserted into publishMaster table."));
    }

    @GetMapping("/fetchPublishMaster")
    public ResponseEntity<List<PublishMaster>> getPublishMasterWithFlagTrue() {
        List<PublishMaster> publishMasters = publishMasterService.getAllPublishMasterWithFlagTrue();
        return ResponseEntity.ok(publishMasters);
    }

    @PostMapping("/publishData")
    public ResponseEntity<ValidationResponse> publishData(@RequestBody PublishedData data) {
        try {
            publishedDataService.insertPublishedData(data);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ValidationResponse(HttpStatus.CREATED.value(), "Data published successfully."));
        } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ValidationResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
    }

     @PostMapping("/fetchPublishedDataById")
    public ResponseEntity<List<PublishedData>> fetchPublishedDataById(@RequestBody PublishSectorRequest request) {
        List<String> publishSectorIds = request.getPublishSectorIds();

        // Validate and handle empty request
        if (publishSectorIds == null || publishSectorIds.isEmpty()) {
            String errorMessage = "Bad Request: publishSectorIds cannot be empty";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }

        List<PublishedData> result = publishedDataService.fetchDataByPublishMasterIds(publishSectorIds);

        // Check if any data is found
        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }

        return ResponseEntity.ok(result);
    }
}
