package com.example.phonebook_api.repositories;

import com.example.phonebook_api.entities.PhonebookEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhonebookEntryRepository extends JpaRepository<PhonebookEntry, Long> {
  Page<PhonebookEntry> findByNameContainingIgnoreCase(String name, Pageable pageable);

  Page<PhonebookEntry> findByPhoneNumberContaining(String phoneNumber, Pageable pageable);
}