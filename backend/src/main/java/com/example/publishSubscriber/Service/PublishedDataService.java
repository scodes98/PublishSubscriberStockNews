package com.example.publishSubscriber.Service;

import com.example.publishSubscriber.Entity.PublishedData;
import com.example.publishSubscriber.Repository.PublishMasterRepository;
import com.example.publishSubscriber.Repository.PublishedDataRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublishedDataService {

    @Autowired
    private PublishedDataRepository publishedDataRepository;

    @Autowired
    private PublishMasterRepository publishMasterRepository;

    public void insertPublishedData(PublishedData data) {
        // Check if publishMasterId exists in publishMaster table
        if (publishMasterRepository.existsById(data.getPublishMasterId())) {
            // Insert data into publishedData table
            publishedDataRepository.save(data);
        } else {
            // Handle the case where publishMasterId does not exist in publishMaster
            throw new RuntimeException("publishMasterId not found in publishMaster table");
        }
    }

    public List<PublishedData> fetchDataByPublishMasterIds(List<String> publishMasterIds) {
        return publishedDataRepository.findByPublishMasterIdIn(publishMasterIds);
    }
}
