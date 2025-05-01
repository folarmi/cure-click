export const queryParamsToAdd = (param: string, filter: string) => {
  let returnedQueryParam;
  if (param === "Ministries, Departments, Agencies (MDAs)") {
    returnedQueryParam = `mdaName=${filter}`;
  } else if (param === "Political actors") {
    returnedQueryParam = `politicalActorName=${filter}`;
  } else if (param === "State") {
    returnedQueryParam = `stateName=${filter}`;
  } else if (param === "Local Govt Area (LGA)") {
    returnedQueryParam = `lgaName=${filter}`;
  } else if (param === "") {
    returnedQueryParam = `name=${filter}`;
  }

  return returnedQueryParam;
};
