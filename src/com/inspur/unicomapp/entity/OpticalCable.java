package com.inspur.unicomapp.entity;

public class OpticalCable {
	//光缆id
	private String text;
	private String id;
	private String city;
	private String glType;
	private String glStatus;
	
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getGlType() {
		return glType;
	}
	public void setGlType(String glType) {
		this.glType = glType;
	}
	public String getGlStatus() {
		return glStatus;
	}
	public void setGlStatus(String glStatus) {
		this.glStatus = glStatus;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
}
