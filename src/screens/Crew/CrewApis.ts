import { ApiCall, ApiCallFormData } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const SpecializeServiceList = async () => {
  try {
    const response = await ApiCall({
      endpoint: "services/dropdown/list",
      method: "GET",
    });

    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  }
};

export const CrewList = async (
  page: number,
  limit: number,
  searchInput: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "crew/list",
      method: "POST",
      data: {
        page,
        limit,
        search: searchInput,
      },
    });
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const AddCrewA = async (
  crewData: any,
  profileImage: any,
  vehicleImage: any,
  certificateImage: any,
  companyImage: any,
  workingDate: any,
  setIsLoading: (value: boolean) => void,
  specializeOptions: any[]
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("applicant_personal_portrait", profileImage?.raw);
    form_data.append("work_vehicle_photo", vehicleImage?.raw);
    form_data.append("certificate_credentials", certificateImage?.raw);
    form_data.append("company_information", companyImage?.raw);
    form_data.append("crew_name", crewData.crew_name);
    form_data.append("preferred_start_work_date", workingDate);
    form_data.append(
      "preferred_work_territory",
      crewData.preferred_work_territory
    );
    form_data.append("address", crewData.address);
    form_data.append("phone_number", crewData.phone_number);
    form_data.append("is_active", "true");
    form_data.append(
      "specialized_services",
      JSON.stringify(
        specializeOptions.map((option: any) => ({
          service_name: option.label,
          service_id: option.value,
        }))
      )
    );
    form_data.append("waiver", crewData.waiver);

    const response = await ApiCallFormData({
      endpoint: "crew/register",
      method: "POST",
      data: form_data,
    });

    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const EditCrewA = async (
  editItem: any,
  workingDate: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    let form_data = new FormData();
    form_data.append("crew_id", editItem.crew_id);
    form_data.append(
      "applicant_personal_portrait",
      editItem.applicant_personal_portrait?.raw
    );
    form_data.append("work_vehicle_photo", editItem.work_vehicle_photo?.raw);
    form_data.append(
      "certificate_credentials",
      editItem.certificate_credentials?.raw
    );
    form_data.append("company_information", editItem?.company_information?.raw);
    form_data.append("crew_name", editItem.crew_name);
    form_data.append("preferred_start_work_date", workingDate);
    form_data.append(
      "preferred_work_territory",
      editItem.preferred_work_territory
    );
    form_data.append("address", editItem.address);
    form_data.append("phone_number", editItem.phone_number);
    form_data.append("is_active", "true");
    form_data.append(
      "specialized_services",
      JSON.stringify(
        editItem?.services?.map((option: any) => ({
          service_name: option.service_name,
          service_id: option.service_id,
          crew_id: editItem.crew_id,
        }))
      )
    );
    form_data.append("waiver", editItem.waiver);

    const response = await ApiCallFormData({
      endpoint: "crew/update",
      method: "POST",
      data: form_data,
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const DeleteCrew = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "crew/delete",
      method: "POST",
      data: {
        crew_id: deleteItem?.crew_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const updateCrewStatus = async (
  user: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "crew/status",
      method: "POST",
      data: {
        crew_id: user.id,
        is_active: user.status,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};
