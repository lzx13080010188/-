package com.inspur.unicomapp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import com.inspur.unicomapp.dao.NmmpGisDao;
import com.inspur.unicomapp.entity.ComboModel;
import com.inspur.unicomapp.entity.NmmpPerson;
import com.inspur.unicomapp.entity.NmmpResource;
import com.inspur.unicomapp.entity.NmmpTask;
import com.inspur.unicomapp.entity.OpticalCable;
import com.inspur.unicomapp.entity.PlanID;
import com.inspur.unicomapp.entity.TaskPoint;
import com.inspur.unicomapp.service.NmmpGisService;

@Service("nmmpGisService")
public class NmmpGisServiceImpl implements NmmpGisService{
	private static final Logger log = Logger.getLogger(NmmpGisServiceImpl.class);
	@Resource
	private NmmpGisDao nmmpGisDao;
	@Override
	public List<NmmpResource> findAllNmmpResource(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpResource> nmmpResources=new ArrayList<NmmpResource>();
		try{
			nmmpResources=nmmpGisDao.findAllNmmpResource(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询资源信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpResources;
	}

	@Override
	public Long getTotalNmmpResource(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Long totalcount=0l;
		try{
			totalcount=nmmpGisDao.getTotalNmmpResource(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询资源列表数据条数信息时异常，异常信息如下："+e);
		}
		return totalcount;
	}

	@Override
	public List<ComboModel> findAllcompany(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<ComboModel> comboModels=new ArrayList<ComboModel>();
		try{
			comboModels=nmmpGisDao.findAllComboModels(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询所属单位信息时异常，异常信息如下："+e);
		}
		return comboModels;
	}

	@Override
	public List<NmmpPerson> findAllNmmpPersons(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpPerson> nmmpPersons=new ArrayList<NmmpPerson>();
		try{
			nmmpPersons=nmmpGisDao.findAllNmmpPersons(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询人员信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpPersons;
	}

	@Override
	public Long getTotalNmmpPerson(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Long totalcount=0l;
		try{
			totalcount=nmmpGisDao.getTotalNmmpPerson(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询人员列表数据条数信息时异常，异常信息如下："+e);
		}
		return totalcount;
	}

	@Override
	public List<NmmpTask> findAllNmmpTasks(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpTask> nmmpTasks=new ArrayList<NmmpTask>();
		try{
			nmmpTasks=nmmpGisDao.findAllNmmpTasks(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpTasks;
	}

	@Override
	public Long getTotalNmmpTask(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Long totalcount=0l;
		try{
			totalcount=nmmpGisDao.getTotalNmmpTask(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务列表数据条数信息时异常，异常信息如下："+e);
		}
		return totalcount;
	}

	@Override
	public List<NmmpTask> findAllNmmpSubTasks(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpTask> nmmpTasks=new ArrayList<NmmpTask>();
		try{
			nmmpTasks=nmmpGisDao.findAllNmmpSubTasks(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpTasks;
	}
	@Override
	public List<NmmpTask> findAllNmmpSubTasks2(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpTask> nmmpTasks=new ArrayList<NmmpTask>();
		try{
			nmmpTasks=nmmpGisDao.findAllNmmpSubTasks2(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpTasks;
	}
	@Override
	public List<PlanID> findXlPlanIds(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<PlanID> xlPlanIds=new ArrayList<PlanID>();
		try{
			xlPlanIds=nmmpGisDao.findXlPlanIds(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务信息列表时异常，异常信息如下："+e);
		}
		return xlPlanIds;
	}

	@Override
	public List<PlanID> findQtPlanIds(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<PlanID> qtPlanIds=new ArrayList<PlanID>();
		try{
			qtPlanIds=nmmpGisDao.findQtPlanIds(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务信息列表时异常，异常信息如下："+e);
		}
		return qtPlanIds;
	}

	@Override
	public List<NmmpPerson> findAllNmmpXlPersons(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpPerson> nmmpPersons=new ArrayList<NmmpPerson>();
		try{
			nmmpPersons=nmmpGisDao.findAllNmmpXlPersons(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询线路巡检人员信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpPersons;
	}

	@Override
	public List<NmmpPerson> findAllNmmpQtPersons(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<NmmpPerson> nmmpPersons=new ArrayList<NmmpPerson>();
		try{
			nmmpPersons=nmmpGisDao.findAllNmmpQtPersons(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询其他巡检人员信息列表时异常，异常信息如下："+e);
		}
		
		return nmmpPersons;
	}

	@Override
	public Long getTotalNmmpXlPerson(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Long totalcount=0l;
		try{
			totalcount=nmmpGisDao.getTotalNmmpXlPerson(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询线路巡检人员列表数据条数信息时异常，异常信息如下："+e);
		}
		return totalcount;
	}

	@Override
	public Long getTotalNmmpQtPerson(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Long totalcount=0l;
		try{
			totalcount=nmmpGisDao.getTotalNmmpQtPerson(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询其他巡检人员列表数据条数信息时异常，异常信息如下："+e);
		}
		return totalcount;
	}

	@Override
	public List<TaskPoint> findAllTaskPoints(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
		try{
			String taskType=(String)map.get("taskType");
			if(taskType.equals("002")){
				taskPoints=nmmpGisDao.findAllXlTaskPoints(map);
			}else{
				taskPoints=nmmpGisDao.findAllQtTaskPoints(map);
			}
			
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务点信息时异常，异常信息如下："+e);
		}
		return taskPoints;
	}

	@Override
	public List<TaskPoint> findAllExeTaskPoints(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
		try{
			String taskType=(String)map.get("taskType");
			if(taskType.equals("002")){
				taskPoints=nmmpGisDao.findAllXlExeTaskPoints(map);
			}else if(taskType.equals("qiandao")){
				taskPoints=nmmpGisDao.findAllXlExeTaskPoints(map);
				taskPoints.addAll(nmmpGisDao.findAllQtExeTaskPoints(map));
			}else{
				taskPoints=nmmpGisDao.findAllQtExeTaskPoints(map);
			}
			
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务点信息时异常，异常信息如下："+e);
		}
		return taskPoints;
	}
	@Override
	public List<TaskPoint> findAllExeTaskPoints2(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
		try{
			String taskType=(String)map.get("taskType");
			if(taskType.equals("002")){
				taskPoints=nmmpGisDao.findAllXlExeTaskPoints2(map);
			}else{
				taskPoints=nmmpGisDao.findAllQtExeTaskPoints2(map);
			}
			
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务点信息时异常，异常信息如下："+e);
		}
		return taskPoints;
	}

	@Override
	public List<ComboModel> findAllDepartMent(Map<String, Object> map) {
		List<ComboModel> comboModels=new ArrayList<ComboModel>();
		try{
			comboModels=nmmpGisDao.findAllDepartMent(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询所属驻点信息时异常，异常信息如下："+e);
		}
		return comboModels;
	}
	@Override
	public List<TaskPoint> findQiandaoPoints(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
		try{
			String taskType=(String)map.get("taskType");
			if(taskType.equals("qiandao")){
				taskPoints=nmmpGisDao.findQiandaoPoints(map);
			}
			
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务点信息时异常，异常信息如下："+e);
		}
		return taskPoints;
	}

	@Override
	public List<Map<String, Object>> findAllXunJianTaskPoints(Map<String, Object> map) {
	// TODO Auto-generated method stub
		List<Map<String, Object>> taskPoints=new ArrayList<Map<String, Object>>();
		try{
			taskPoints=nmmpGisDao.findAllXunJianTaskPoints(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务点信息时异常，异常信息如下："+e);
		}
		return taskPoints;
	}

	@Override
	public List<TaskPoint> queryResourcePoints(Map<String, Object> map) {
		List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
		try{
			taskPoints=nmmpGisDao.queryResourcePoints(map);
		}catch(Exception e){
			e.printStackTrace();
			log.error("查询任务点信息时异常，异常信息如下："+e);
		}
		return taskPoints;
	}

	@Override
	public List<String> initGlResource(String city) {
		List<String> glName=new ArrayList<String>();
		glName = nmmpGisDao.initGlResource(city);
		return glName;
	}

	@Override
	public List<TaskPoint> findGlResourcesByCity(Map map) {
		List<TaskPoint> optial=new ArrayList<TaskPoint>();
		optial = nmmpGisDao.findGlResourcesByCity(map);
		return optial;
	}

	@Override
	public Long findGlResourcesCount(Map map) {
		Long count = 0l;
		count = nmmpGisDao.findGlResourcesCount(map);
		return count;
	}

	@Override
	public List<TaskPoint> queryResourceGlPoints(Map<String, Object> map) {
		List<TaskPoint> taskPoint=new ArrayList<TaskPoint>();
		taskPoint = nmmpGisDao.queryResourceGlPoints(map);
		return taskPoint;
	}
}
