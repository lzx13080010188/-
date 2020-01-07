package com.inspur.unicomapp.entity;

public class NmmpTask {
	private String taskId;
	private String taskName;
	private String taskType;
	private String startTime;
	private String endTime;
	private String taskSource;
	private String cityId;
	private String cityName;
	private String companyId;
	private String companyName;
	private String pointId;
	private String pointName;
	private String executeManId;
	
	
	public NmmpTask(){}
	
	public NmmpTask(String taskId,String taskName,String taskType,String startTime,String endTime,String taskSource,String cityId,String cityName){
		this.taskId=taskId;
		this.taskName=taskName;
		this.taskType=taskType;
		this.startTime=startTime;
		this.endTime=endTime;
		this.taskSource=taskSource;
		this.cityId=cityId;
		this.cityName=cityName;
	}
	
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getTaskSource() {
		return taskSource;
	}
	public void setTaskSource(String taskSource) {
		this.taskSource = taskSource;
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

	public String getPointId() {
		return pointId;
	}

	public void setPointId(String pointId) {
		this.pointId = pointId;
	}

	public String getPointName() {
		return pointName;
	}

	public void setPointName(String pointName) {
		this.pointName = pointName;
	}

	public String getExecuteManId() {
		return executeManId;
	}

	public void setExecuteManId(String executeManId) {
		this.executeManId = executeManId;
	}
	
	
}
