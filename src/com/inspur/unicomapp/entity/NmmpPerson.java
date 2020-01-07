package com.inspur.unicomapp.entity;

public class NmmpPerson {
	private String personId;
	private String personName;
	private String cityId;
	private String cityName;
	private String companyId;
	private String companyName;
	private String source;
	private String executeTime;
	private String taskId;
	private String departMentId;
	private String departMentName;
	
	public NmmpPerson(){}
	
	public NmmpPerson(String personId,String personName,String companyId,String companyName,String source){
		this.personId=personId;
		this.personName=personName;
		this.companyId=companyId;
		this.companyName=companyName;
		this.source=source;
	}
	
	public NmmpPerson(String personId,String personName,String executeTime){
		this.personId=personId;
		this.personName=personName;
		this.executeTime=executeTime;
	}
	
	public String getPersonId() {
		return personId;
	}
	public void setPersonId(String personId) {
		this.personId = personId;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}

	public String getExecuteTime() {
		return executeTime;
	}

	public void setExecuteTime(String executeTime) {
		this.executeTime = executeTime;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getDepartMentId() {
		return departMentId;
	}

	public void setDepartMentId(String departMentId) {
		this.departMentId = departMentId;
	}

	public String getDepartMentName() {
		return departMentName;
	}

	public void setDepartMentName(String departMentName) {
		this.departMentName = departMentName;
	}
	
	
}
