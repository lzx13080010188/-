package com.inspur.unicomapp.service;

import java.util.List;
import java.util.Map;


import com.inspur.unicomapp.entity.ComboModel;
import com.inspur.unicomapp.entity.NmmpPerson;
import com.inspur.unicomapp.entity.NmmpResource;
import com.inspur.unicomapp.entity.NmmpTask;
import com.inspur.unicomapp.entity.OpticalCable;
import com.inspur.unicomapp.entity.PlanID;
import com.inspur.unicomapp.entity.TaskPoint;



public interface NmmpGisService {
	/**
	 * 查询资源表格数据
	 * @param map
	 * @return
	 */
	public List<NmmpResource> findAllNmmpResource(Map<String, Object> map);
	
	/**
	 * 获取资源表格数据总条数
	 * @param map
	 * @return
	 */
	public Long getTotalNmmpResource(Map<String, Object> map);
	
	/**
	 * @author zhang.xd
	 * @desc 查询所属单位下拉框数据源
	 * @param map
	 * @return
	 */
	public List<ComboModel> findAllcompany(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询所属驻点下拉框数据源
	 * @param map
	 * @return
	 */
	public List<ComboModel> findAllDepartMent(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询人员列表信息
	 * @param map
	 * @return
	 */
	public List<NmmpPerson> findAllNmmpPersons(Map<String, Object> map);
	
	/**
	 * @author zhang.xd
	 * @desc 查询人员信息条数
	 * @param map
	 * @return
	 */
	public Long getTotalNmmpPerson(Map<String, Object> map);
	
	/**
	 * @author zhang.xd
	 * @desc 查询任务信息列表
	 * @param map
	 * @return
	 */
	public List<NmmpTask> findAllNmmpTasks(Map<String, Object> map);
	
	/**
	 * @author zhang.xd
	 * @desc 获取任务列表数据条数
	 * @param map
	 * @return
	 */
	public Long getTotalNmmpTask(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询任务信息列表
	 * @param map
	 * @return
	 */
	public List<NmmpTask> findAllNmmpSubTasks(Map<String, Object> map);
	public List<NmmpTask> findAllNmmpSubTasks2(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询当前人员执行的线路巡检任务ID
	 * @param map
	 * @return
	 */
	public List<PlanID> findXlPlanIds(Map<String, Object> map);
	
	/**
	 * @author zhang.xd
	 * @desc 查询当前人员执行的其他巡检任务ID
	 * @param map
	 * @return
	 */
	public List<PlanID> findQtPlanIds(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询线路巡检执行人员列表信息
	 * @param map
	 * @return
	 */
	public List<NmmpPerson> findAllNmmpXlPersons(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询线路巡检执行人员列表信息
	 * @param map
	 * @return
	 */
	public List<NmmpPerson> findAllNmmpQtPersons(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询线路巡检执行人员信息条数
	 * @param map
	 * @return
	 */
	public Long getTotalNmmpXlPerson(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询其他巡检执行人员信息条数
	 * @param map
	 * @return
	 */
	public Long getTotalNmmpQtPerson(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询所属单位下拉框数据源
	 * @param map
	 * @return
	 */
	public List<TaskPoint> findAllTaskPoints(Map<String, Object> map);
	
	
	/**
	 * @author zhang.xd
	 * @desc 查询所属单位下拉框数据源
	 * @param map
	 * @return
	 */
	public List<TaskPoint> findAllExeTaskPoints(Map<String, Object> map);
	public List<TaskPoint> findAllExeTaskPoints2(Map<String, Object> map);
	public List<TaskPoint> findQiandaoPoints(Map<String, Object> map) ;
	
	public List<Map<String, Object>> findAllXunJianTaskPoints(Map<String, Object> map) ;

	public List<TaskPoint>  queryResourcePoints(Map<String, Object> map);

	public List<String> initGlResource(String city);

	public List<TaskPoint> findGlResourcesByCity(Map map);

	public Long findGlResourcesCount(Map map);

	public List<TaskPoint> queryResourceGlPoints(Map<String, Object> map);
}
