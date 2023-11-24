package com.example.publishSubscriber.Repository;

import com.example.publishSubscriber.Entity.PublishedData;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublishedDataRepository extends MongoRepository<PublishedData, String> {
    List<PublishedData> findByPublishMasterIdIn(List<String> publishMasterIds);
}

