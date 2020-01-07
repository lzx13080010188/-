package com.inspur.unicomapp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inspur.unicomapp.common.Constants;
import com.inspur.unicomapp.common.Result;
import com.inspur.unicomapp.common.ResultGenerator;
import com.inspur.unicomapp.entity.ComboModel;
import com.inspur.unicomapp.entity.NmmpPerson;
import com.inspur.unicomapp.entity.NmmpResource;
import com.inspur.unicomapp.entity.NmmpTask;
import com.inspur.unicomapp.entity.PlanID;
import com.inspur.unicomapp.entity.TaskPoint;
import com.inspur.unicomapp.service.NmmpGisService;

@Controller
@RequestMapping("/nmmpgis")
public class NmmpGisController<T> {
	@Resource
    private NmmpGisService nmmpGisService;
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(NmmpGisController.class);
    
    @RequestMapping(value = "/resdatagrid", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findResourceListData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        String resourceNameStr = jsonObj.getString("resourceName");  
        String cityNameStr = jsonObj.getString("cityName");  
        String resourceTypeStr = jsonObj.getString("resourceType");
        String rescompany = jsonObj.getString("rescompany");  
        String inspectstate = jsonObj.getString("inspectstate");  
        String resourcemonth = jsonObj.getString("resourcemonth"); 
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo")); 
       
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        try {
        	map.put("resourceName", resourceNameStr);
        	System.out.println("resourceName"+resourceNameStr);
        	System.out.println("inspectstate"+inspectstate);
            map.put("cityName",cityNameStr);
            map.put("resourceType",resourceTypeStr);
            map.put("rescompany",rescompany);
            map.put("inspectstate",inspectstate);
            map.put("resourcemonth",resourcemonth);
            map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
            	map.put("start", start);
            	map.put("end", end);
            }
	    	List<NmmpResource> nmmpResources=nmmpGisService.findAllNmmpResource(map);
	    	Long nmmpResourceTotal=nmmpGisService.getTotalNmmpResource(map);
	    	
        	data.put("rows", nmmpResources);
            data.put("total", nmmpResourceTotal);
            log.info("资源表数据加载成功，总数："+nmmpResourceTotal+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        result.setData(data);
        return result;
    }
    
    @RequestMapping(value = "/perdatagrid", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findPersonListData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>(); 
    	Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        
        String personNameStr = jsonObj.getString("personName");  
        String cityNameStr = jsonObj.getString("cityName");  
        String companyNameStr = StringUtils.isNotEmpty(jsonObj.getString("companyName"))?jsonObj.getString("companyName"):"";  
        String departMentIdStr=StringUtils.isNotEmpty(jsonObj.getString("departMentId"))?jsonObj.getString("departMentId"):"";  
        String startTimeStr ="";
        if(jsonObj.has("startTime")) startTimeStr =jsonObj.getString("startTime");
        
        String endTimeStr = "";  
        if(jsonObj.has("endTime"))  endTimeStr = jsonObj.getString("endTime");  
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo")); 
       
        try {
        	map.put("personName", personNameStr);
        	if(StringUtils.isNotEmpty(cityNameStr)){
        		cityNameStr=Constants.CITYMAP.get(cityNameStr);
        	}
            map.put("cityName",cityNameStr);
            map.put("companyName",companyNameStr);
            map.put("departMentId",departMentIdStr);
            map.put("startTime",startTimeStr);
            map.put("endTime",endTimeStr);
            map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
            
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
            	map.put("start", start);
            	map.put("end", end);
            }
	    	List<NmmpPerson> nmmpPersons=nmmpGisService.findAllNmmpPersons(map);
	    	Long nmmpPersonsTotal=nmmpGisService.getTotalNmmpPerson(map);
        	data.put("rows", nmmpPersons);
            data.put("total", nmmpPersonsTotal);
            result.setData(data);
            log.info("人员表数据加载成功，总数："+nmmpPersonsTotal+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    
    @RequestMapping(value = "/tasksubdatagrid", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findSubTaskListData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String personIdStr=jsonObj.getString("personId");
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo"));
        String startTimeStr = jsonObj.getString("startTime");  
        String endTimeStr = jsonObj.getString("endTime");  
        try {
        	List<NmmpTask> nmmpTasks=new ArrayList<NmmpTask>();
        	Integer nmmpTasksTotal =0;
        	map.put("personId", personIdStr);
        	map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
            map.put("startTime",startTimeStr);
            map.put("endTime",endTimeStr);
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
            	map.put("start", start);
            	map.put("end", end);
            }
            List<PlanID> xlPlanIds=nmmpGisService.findXlPlanIds(map);
            List<PlanID> qlPlanIds=nmmpGisService.findQtPlanIds(map);
            if(xlPlanIds.size()>0||qlPlanIds.size()>0){
            	nmmpTasksTotal =xlPlanIds.size()+qlPlanIds.size();
                StringBuffer planIds=new StringBuffer("");
                for(PlanID planId:xlPlanIds){
                	planIds.append(planId.getPlanId()+",");
                }
                
                for(PlanID planId:qlPlanIds){
                	planIds.append(planId.getPlanId()+",");
                }
                String planIdStr=planIds.toString();
                if(StringUtils.isNotEmpty(planIdStr)){
                    map.put("planIds", planIdStr.substring(0, planIdStr.length()-1));
                }
                List<NmmpTask> nmmpTasksResult=nmmpGisService.findAllNmmpSubTasks(map);
            	for(NmmpTask nmmpTask:nmmpTasksResult){
            		nmmpTask.setExecuteManId(personIdStr);
            		nmmpTasks.add(nmmpTasks.size(),nmmpTask);
            	}
            }
        	data.put("rows", nmmpTasks);
            data.put("total", nmmpTasksTotal);
            result.setData(data);
            log.info("人员任务子表数据加载成功，总数："+nmmpTasksTotal+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/tasksubdatagrid2", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findSubTaskListData2( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String personIdStr=jsonObj.getString("personId");
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo"));
        String startTimeStr = jsonObj.getString("startTime");  
        String endTimeStr = jsonObj.getString("endTime");  
        try {
        	List<NmmpTask> nmmpTasks=new ArrayList<NmmpTask>();
        	Integer nmmpTasksTotal =0;
        	map.put("personId", personIdStr);
        	map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
            map.put("startTime",startTimeStr);
            map.put("endTime",endTimeStr);
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
            	map.put("start", start);
            	map.put("end", end);
            }
            List<PlanID> xlPlanIds=nmmpGisService.findXlPlanIds(map);
            List<PlanID> qlPlanIds=nmmpGisService.findQtPlanIds(map);
            if(xlPlanIds.size()>0||qlPlanIds.size()>0){
            	nmmpTasksTotal =xlPlanIds.size()+qlPlanIds.size();
                StringBuffer planIds=new StringBuffer("");
                for(PlanID planId:xlPlanIds){
                	planIds.append(planId.getPlanId()+",");
                }
                
                for(PlanID planId:qlPlanIds){
                	planIds.append(planId.getPlanId()+",");
                }
                String planIdStr=planIds.toString();
                if(StringUtils.isNotEmpty(planIdStr)){
                    map.put("planIds", planIdStr.substring(0, planIdStr.length()-1));
                }
                List<NmmpTask> nmmpTasksResult=nmmpGisService.findAllNmmpSubTasks2(map);
            	for(NmmpTask nmmpTask:nmmpTasksResult){
            		nmmpTask.setExecuteManId(personIdStr);
            		nmmpTasks.add(nmmpTasks.size(),nmmpTask);
            	}
            }
        	data.put("rows", nmmpTasks);
            data.put("total", nmmpTasksTotal);
            result.setData(data);
            log.info("人员任务子表数据加载成功，总数："+nmmpTasksTotal+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/taskdatagrid", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findTaskListData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        
        String taskNameStr = jsonObj.getString("taskName");  
        String cityNameStr = jsonObj.getString("cityName");  
        String taskTypeStr = jsonObj.getString("taskType");  
        String startTimeStr = jsonObj.getString("startTime");  
        String endTimeStr = jsonObj.getString("endTime");  
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo")); 
        try {
        	map.put("taskName", taskNameStr);
        	if(StringUtils.isNotEmpty(cityNameStr)){
        		cityNameStr=Constants.CITYMAP.get(cityNameStr);
        	}
            map.put("cityName",cityNameStr);
            map.put("taskType",taskTypeStr);
            map.put("startTime",startTimeStr);
            map.put("endTime",endTimeStr);
            map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
            
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
            	map.put("start", start);
            	map.put("end", end);
            }
        	
	    	List<NmmpTask> nmmpTasks=nmmpGisService.findAllNmmpTasks(map);
	    	Long nmmpTasksTotal=nmmpGisService.getTotalNmmpTask(map);
        	data.put("rows", nmmpTasks);
            data.put("total", nmmpTasksTotal);
            result.setData(data);
            log.info("人员任务子表数据加载成功，总数："+nmmpTasksTotal+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    
    @RequestMapping(value = "/personsubdatagrid", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findSubPersonListData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String taskIdStr=jsonObj.getString("taskId");
        String taskTypeStr=jsonObj.getString("taskType");
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo"));
        String startTimeStr = jsonObj.getString("startTime");  
        String endTimeStr = jsonObj.getString("endTime");  
        try {
        	List<NmmpPerson> nmmpPersons=new ArrayList<NmmpPerson>();
        	List<NmmpPerson> nmmpPersonTmps=new ArrayList<NmmpPerson>();
        	Long personTotalCount=0l;
        	map.put("taskId", taskIdStr);
        	map.put("taskType", taskTypeStr);
        	map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
            map.put("startTime",startTimeStr);
            map.put("endTime",endTimeStr);
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
            	map.put("start", start);
            	map.put("end", end);
            }
            
            if(taskTypeStr.equals("002")){
            	nmmpPersonTmps=nmmpGisService.findAllNmmpXlPersons(map);
            	for(NmmpPerson nmmpPerson:nmmpPersonTmps)
            	personTotalCount=nmmpGisService.getTotalNmmpXlPerson(map);
            }else{
            	nmmpPersonTmps=nmmpGisService.findAllNmmpQtPersons(map);
            	personTotalCount=nmmpGisService.getTotalNmmpQtPerson(map);
            }
            for(NmmpPerson nmmpPerson:nmmpPersonTmps){
            	nmmpPerson.setTaskId(taskIdStr);
            	nmmpPersons.add(nmmpPersons.size(), nmmpPerson);
            }
        	data.put("rows", nmmpPersons);
            data.put("total", personTotalCount);
            result.setData(data);
            log.info("人员任务子表数据加载成功，总数："+nmmpPersons.size()+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    
    @RequestMapping(value = "/companySel", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findCompanyData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String cityIdStr = jsonObj.getString("cityId"); 
        try {
        	map.put("cityId", Long.valueOf(Constants.CITYMAP.get(cityIdStr)));
        	List<ComboModel> comboModels=nmmpGisService.findAllcompany(map);
        	data.put("results", comboModels);
            result.setData(data);
            log.info("所属单位下拉框数据加载成功，总数："+comboModels.size()+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    
    @RequestMapping(value = "/departMentSel", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findDepartMentData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String cityIdStr = jsonObj.getString("cityId"); 
        String companyIdStr = jsonObj.getString("companyId"); 
        try {
        	map.put("cityId", Long.valueOf(Constants.CITYMAP.get(cityIdStr)));
        	map.put("companyId", Long.valueOf(companyIdStr));
        	List<ComboModel> comboModels=nmmpGisService.findAllDepartMent(map);
        	data.put("results", comboModels);
            result.setData(data);
            log.info("所属单位下拉框数据加载成功，总数："+comboModels.size()+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    //查找经纬点
    @RequestMapping(value = "/queryTaskPoints", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findTaskPointData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String taskIdStr = jsonObj.getString("taskId"); 
        String taskTypeStr = jsonObj.getString("taskType");
        try {
        	map.put("taskId", taskIdStr);
        	map.put("taskType", taskTypeStr);
        	List<TaskPoint> taskPoints=nmmpGisService.findAllTaskPoints(map);
        	data.put("results", taskPoints);
            result.setData(data);
            log.info("任务点数据加载成功，总数："+taskPoints.size()+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/queryXunJianTaskPoints", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> queryXunJianTaskPoints( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();  
    	Result result = ResultGenerator.genSuccessResult();
    	Map data = new HashMap();
    	String wc_id = jsonObj.getString("wanchengjinduId"); 
    	try {
    		map.put("wanchengjinduId", wc_id);
    		List<Map<String, Object>> xunJianTaskPoints=nmmpGisService.findAllXunJianTaskPoints(map);
    		data.put("results", xunJianTaskPoints);
    		result.setData(data);
    		log.info("任务点数据加载成功，总数："+xunJianTaskPoints.size()+"条");
    	}catch(Exception e){
    		log.error("系统异常e:{}", e);  
    	}
    	return result;
    }
    
    
    @RequestMapping(value = "/queryExeTaskPoints", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findExeTaskPointData( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>(); 
    	List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
    	List<TaskPoint> taskPoints2=new ArrayList<TaskPoint>();
    	List<TaskPoint> taskPoints3=new ArrayList<TaskPoint>();
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String taskIdStr = jsonObj.getString("taskId"); 
        String taskTypeStr = jsonObj.getString("taskType");
        String personIdStr = jsonObj.getString("personId"); 
        String qiandaoTimeStr ="";
        if(jsonObj.has("qiandaoTime")) 
    	{
        	qiandaoTimeStr =jsonObj.getString("qiandaoTime");
        	map.put("qiandaoTime",qiandaoTimeStr);
    	}
        try {
        	map.put("taskId", taskIdStr);
        	map.put("taskType", taskTypeStr);
        	map.put("personId", personIdStr);
    	  
        	taskPoints=nmmpGisService.findAllExeTaskPoints(map);
        	taskPoints2=nmmpGisService.findAllExeTaskPoints2(map);
        	if(taskTypeStr.equals("qiandao")){
        		taskPoints3=nmmpGisService.findQiandaoPoints(map);
        	}
        	data.put("results", taskPoints);
        	data.put("results2", taskPoints2);
        	data.put("results3", taskPoints3);
            result.setData(data);
            log.info("任务点数据加载成功，总数："+taskPoints.size()+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/queryResourcePoints", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> queryResourcePoints( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>(); 
    	List<TaskPoint> taskPoints=new ArrayList<TaskPoint>();
    	List<TaskPoint> taskPoints2=new ArrayList<TaskPoint>();
    	List<TaskPoint> taskPoints3=new ArrayList<TaskPoint>();
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String resourcename = jsonObj.getString("resourcename"); 
        String resourcecity = jsonObj.getString("resourcecity");
        String rescompany = jsonObj.getString("rescompany");
        String resourcetype = jsonObj.getString("resourcetype");
        String inspectstate = jsonObj.getString("inspectstate");
        String resourcemonth = jsonObj.getString("resourcemonth"); 
        String qiandaoTimeStr ="";
        if(jsonObj.has("qiandaoTime")) 
    	{
        	qiandaoTimeStr =jsonObj.getString("qiandaoTime");
        	map.put("qiandaoTime",qiandaoTimeStr);
    	}
        try {
        	map.put("resourcecity", resourcecity);
        	map.put("resourcetype", resourcetype);
        	map.put("resourcemonth", resourcemonth);
        	map.put("resourcename", resourcename);
        	map.put("rescompany", rescompany);
        	map.put("inspectstate", inspectstate);
        	taskPoints=nmmpGisService.queryResourcePoints(map);
        	data.put("results", taskPoints);
            result.setData(data);
            log.info("任务点数据加载成功，总数："+taskPoints.size()+"条");
        }catch(Exception e){
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/initGlResource", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> initGlResource( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>(); 
    	List<String> glName=new ArrayList<String>();
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        String city = jsonObj.getString("cityId"); 
        System.out.println("city---"+city);
        try {
        	glName=nmmpGisService.initGlResource(city);
        	data.put("results", glName);
            result.setData(data);
            log.info("任务点数据加载成功，总数："+glName.size()+"条");
        }catch(Exception e){
        	e.printStackTrace();
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/glresourcegrid", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> findGlResourcesByCity( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>(); 
    	List<TaskPoint> optial=new ArrayList<TaskPoint>();
        Result result = ResultGenerator.genSuccessResult();
        Map data = new HashMap();
        int pageSize = Integer.valueOf(jsonObj.getString("pageSize"));  
        int pageNo = Integer.valueOf(jsonObj.getString("pageNo")); 
        String city = jsonObj.getString("city"); 
        String glName = jsonObj.getString("glName");
        System.out.println("city---"+city);
        System.out.println("glName---"+glName);
        try {
        	map.put("city", city);
        	map.put("glName", glName);
        	map.put("pageSize",pageSize);
            map.put("pageNo",pageNo);
             
            //分页使用
            if(pageNo>0&&pageSize>0){
            	Integer start=((pageNo-1)*pageSize)+1;
                Integer end=(pageNo*pageSize);
             	map.put("start", start);
             	map.put("end", end);
            }
        	optial=nmmpGisService.findGlResourcesByCity(map);
        	Long optialCount = nmmpGisService.findGlResourcesCount(map);
        	data.put("rows", optial);
        	data.put("total", optialCount);
            result.setData(data);
            System.out.println(optial+","+optialCount);
        }catch(Exception e){
        	e.printStackTrace();
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
    
    @RequestMapping(value = "/queryResourceGlPoints", method = RequestMethod.POST)
    @ResponseBody
    public Result<T> queryResourceGlPoints( HttpServletRequest request, @RequestBody JSONObject jsonObj ) throws Exception{
    	//创建Map集合存储城市，光缆名称
    	Map<String, Object> map = new HashMap<String, Object>(); 
    	//创建List集合接受业务层返回的值
    	List<TaskPoint> taskPoint=new ArrayList<TaskPoint>();
    	//Result去获得结果集
        Result result = ResultGenerator.genSuccessResult();
        //存储结果集的Map
        Map data = new HashMap();
        String city = jsonObj.getString("city"); 
        String glName = jsonObj.getString("glName"); 
        System.out.println(city+","+glName);
        try {
        	map.put("city", city);
        	map.put("glName", glName);
        	taskPoint=nmmpGisService.queryResourceGlPoints(map);
        	data.put("results", taskPoint);
            result.setData(data);
            log.info("任务点数据加载成功，总数："+taskPoint.size()+"条");
        }catch(Exception e){
        	e.printStackTrace();
        	log.error("系统异常e:{}", e);  
        }
        return result;
    }
}
