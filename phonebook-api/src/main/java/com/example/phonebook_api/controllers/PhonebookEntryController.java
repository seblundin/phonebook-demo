package com.example.phonebook_api.controllers;

import com.example.phonebook_api.dtos.CreatePhonebookEntryDto;
import com.example.phonebook_api.dtos.PagedResponse;
import com.example.phonebook_api.dtos.PhonebookEntryDto;
import com.example.phonebook_api.entities.PhonebookEntry;
import com.example.phonebook_api.repositories.PhonebookEntryRepository;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/phonebook")
public class PhonebookEntryController {

  private final PhonebookEntryRepository repository;

  public PhonebookEntryController(PhonebookEntryRepository repository) {
    this.repository = repository;
  }

  // Get entries with optional filters
  @GetMapping
  public ResponseEntity<PagedResponse<PhonebookEntryDto>> getAllEntries(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String phoneNumber,
      @PageableDefault(size = 10, sort = "name") Pageable pageable) {

    Page<PhonebookEntry> page;

    if (name != null) {
      page = repository.findByNameContainingIgnoreCase(name, pageable);
    } else if (phoneNumber != null) {
      page = repository.findByPhoneNumberContaining(phoneNumber, pageable);
    } else {
      page = repository.findAll(pageable);
    }

    List<PhonebookEntryDto> dtos = page.getContent().stream()
        .map(entry -> new PhonebookEntryDto(entry.getId(), entry.getName(), entry.getPhoneNumber()))
        .toList();

    return ResponseEntity.ok(new PagedResponse<>(
        dtos,
        page.getNumber(),
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages()));
  }

  // Get one entry
  @GetMapping("/{id}")
  public ResponseEntity<PhonebookEntryDto> getEntryById(@PathVariable Long id) {
    return repository.findById(id)
        .map(entry -> ResponseEntity.ok(new PhonebookEntryDto(
            entry.getId(), entry.getName(), entry.getPhoneNumber())))
        .orElse(ResponseEntity.notFound().build());
  }

  // Create new entry
  @PostMapping
  public ResponseEntity<PhonebookEntryDto> createEntry(
      @Valid @RequestBody CreatePhonebookEntryDto dto) {
    PhonebookEntry saved = repository.save(new PhonebookEntry(dto.getName(), dto.getPhoneNumber()));
    return ResponseEntity.ok(new PhonebookEntryDto(
        saved.getId(), saved.getName(), saved.getPhoneNumber()));
  }

  // Update entry
  @PutMapping("/{id}")
  public ResponseEntity<PhonebookEntryDto> updateEntry(
      @PathVariable Long id,
      @Valid @RequestBody CreatePhonebookEntryDto dto) {

    return repository.findById(id)
        .map(entry -> {
          entry.setName(dto.getName());
          entry.setPhoneNumber(dto.getPhoneNumber());
          PhonebookEntry updated = repository.save(entry);
          return ResponseEntity.ok(new PhonebookEntryDto(
              updated.getId(), updated.getName(), updated.getPhoneNumber()));
        })
        .orElse(ResponseEntity.notFound().build());
  }

  // Delete entry
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
    if (!repository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    repository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
