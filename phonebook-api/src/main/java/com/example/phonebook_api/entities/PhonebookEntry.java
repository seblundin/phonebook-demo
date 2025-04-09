package com.example.phonebook_api.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class PhonebookEntry {

  private @Id @GeneratedValue Long id;
  private String name;
  private String phoneNumber;

  PhonebookEntry() {
  }

  public PhonebookEntry(String name, String phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (!(o instanceof PhonebookEntry))
      return false;
    PhonebookEntry phonebookEntry = (PhonebookEntry) o;
    return Objects.equals(this.id, phonebookEntry.id) && Objects.equals(this.name, phonebookEntry.name)
        && Objects.equals(this.phoneNumber, phonebookEntry.phoneNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.name, this.phoneNumber);
  }
}