import { action, computed, observable, toJS } from "mobx";
import { flatten, fromPairs, isArray } from "lodash";
import moment from "moment";
import englishMeta from "./components/LanguageConfigPage/fullMetaData.json";

const query = {
  me: {
    resource: "me.json",
    params: {
      fields: "*,organisationUnits[*]",
    },
  },
  program: {
    resource: `programs/vf8dN49jprI`,
    params: {
      fields:
        "organisationUnits[id,name],programStages[programStageDataElements[displayInReports,dataElement[id,name]]]",
    },
  },
  categories: {
    resource: "categories.json",
    params: {
      fields: "name,id,code,categoryOptions[id,name]",
      paging: "false",
      filter: "code:in:[RT01]",
    },
  },
  options: {
    resource: "optionSets.json",
    params: {
      fields: "id,code,options[code,name]",
      paging: "false",
      filter: "code:in:[SX01,YN01,MD01,PD01,TI01,100U,100ATPOINT,100RefLevels]",
    },
  },
};
const categoryOptionCombos = [
  {
    name: "1. National",
    id: "l4UMmqvSBe5",
  },
  {
    name: "2. Foreigner",
    id: "VJU0bY182ND",
  },
  {
    name: "3. Refugee",
    id: "wUteK0Om3qP",
  },
];

class Store {
  @observable engine: any;
  @observable userOrgUnits: any = [];
  @observable nationalitySelect: any;
  @observable selectedOrgUnit: any;
  @observable activeLanguage: any;
  @observable ICDLang: any =  null;
  @observable programs = [];
  @observable selectedNationality: any;
  @observable optionSets: any;
  @observable page = 1;
  @observable pageSize = 10;
  @observable total = 0;
  @observable program = "vf8dN49jprI";
  @observable programStage = "aKclf7Yl1PE";
  @observable attributeCC = "UjXPudXlraY";
  @observable data: any;
  @observable sorter = "created:desc";
  @observable search = "";
  @observable currentPage = "1";
  @observable programOrganisationUnits = []; /** !!!!!!!!!! */
  @observable currentEvent: any;
  @observable programExists = null;
  @observable viewMode = false;
  @observable editing = false;
  @observable forceDisable = false;
  @observable availableDataElements = [];
  @observable ICDAltSearchtextA: any;
  @observable attributesExist: boolean | null = null;
  @observable allDisabled: any = {
    ZKBE8Xm9DJG: false,
    ZYKmQ9GPOaF: false,
    MOstDqSY0gO: false,
    zwKo51BEayZ: false,
    bNpMzyShDCX: false,
    u44XP9fZweA: false,
    b70okb06FWa: false,
    t5nTEmlScSt: false,
    dsiwvNQLe5n: false,
    RbrUuKFSqkZ: false,
    q7e7FOXKnOf: false,
    e96GB4CXyd3: false,
    i8rrl8YWxLF: false,
    xNCSFrgdUgi: false,
    zcn7acUB6x1: false,
    KpfvNQSsWIw: false,
    AJAraEcfH63: false,
    RJhbkjYrODG: false,
    ymyLrfEcYkD: false,
    K5BDPJQk1BP: false,
    Z41di0TRjIu: false,
    uaxjt0inPNF: false,
    V4rE1tsj5Rb: false,
    ivnHp4M4hFF: false,
    jf9TogeSZpk: false,
    lQ1Byr04JTx: false,
    GFVhltTCG8b: false,
    xAWYJtQsg8M: false,
    DdfDMFW4EJ9: false,
    sfpqAeqKeyQ: false,
    Ylht9kCLSRW: true,
    zb7uTuBCPrN: true,
    QGFYJK00ES7: true,
    CnPGhOcERFF: true,
    myydnkmLfhp: true,
    aC64sB86ThG: true,
    cmZrrHfTxW3: true,
    U18Tnfz9EKd: false,
    QTKk2Xt8KDu: true,
    DKlOhZJOCrX: true,
    xeE5TQLvucB: true,
    FhHPxY16vet: false,
    KsGOxFyzIs1: false,
    gNM2Yhypydx: false,
    tYH7drlbNya: false,
    fQWuywOaoN2: false,
    Kk0hmrJPR90: false,
    b4yPk98om7e: false,
    j5TIQx3gHyF: false,
    wX3i3gkTG4m: false,
    JhHwdQ337nn: false,
    xDMX2CJ4Xw3: false,
    o1hG9vr0peF: false,
    jY3K6Bv4o9Q: false,
    AZSlwlRAFig: false,
    UfG52s4YcUt: false,
    kGIDD5xIeLC: true,
    mDez8j7furx: false,
    WkXxkKEJLsg: true,
    fleGy9CvHYh: true,
    hO8No9fHVd2: true,
    zD0E77W4rFs: false,
    eCVDO6lt4go: true,
    tuMMQsGtE69: false,
    C8n6hBilwsX: false,
    IeS8V8Yf40N: false,
    sJhOdGLD5lj: false,
    k9xdBQzYMXo: false,
    yftBZ5bSEOb: false,
    fJUy96o8akn: false,
    S53kx50gjQn: false,
    L97MrANAav9: false,
    cSDJ9kSJkFP: false,
    uckvenVFnwf: false,
    ZFdJRT3PaUd: false,
    Op5pSvgHo1M: false,
    QHY3iYRLvMp: false,
    NkiH8GTX6HC: false,
    SDPq8UURlWc: false,
    zqW9xWyqOur: false,
    ctbKSNV2cg7: false,
    T4uxg60Lalw: false,
    twVlVWM3ffz: false,
    QDHeWslaEoH: false,
    WqYvFt79TQB: false,
  };

  @action showEvents = () => {
    this.data = null;
    this.edit();
    this.currentEvent = null;
    this.editing = false;
    this.currentPage = "1";
  };
  @action showForm = () => (this.currentPage = "3");
  @action showLang = () => (this.currentPage = "2");
  @action setEngine = (engine: any) => (this.engine = engine);
  @action edit = () => (this.viewMode = false);
  @action view = () => (this.viewMode = true);
  @action setCurrentEvent = (event: any) => (this.currentEvent = event);
  @action setSelectedNationality = async (nationality: any) => {
    try {
      console.log("Nationality is ", nationality);
      this.selectedNationality = nationality;
      if (this.canInsert) {
        await this.queryEvents();
      } else {
        this.data = null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action
  loadUserOrgUnits = async () => {
    console.log("we are in the function now", query);
    try {
      const data = await this.engine.query(query);

      console.log('loadUserOrgUnits:', data)

      this.userOrgUnits = data.me.organisationUnits;
      const options = data.options.optionSets
        .filter((o: any) => {
          return !!o.code;
        })
        .map((optionSet: any) => {
          return [optionSet.code, optionSet.options];
        });
      const units = data.program.organisationUnits;

      this.programOrganisationUnits = units;
      this.optionSets = fromPairs(options);
      const programStage = data.program.programStages[0];
      this.availableDataElements = programStage.programStageDataElements.map(
        (de: any) => {
          return { ...de.dataElement, selected: de.displayInReports };
        }
      );

      if (!!this.activeLanguage?.lang) {
        let al = this.activeLanguage?.lang;
        al = toJS(al)
        
        const metaQ = {
          meta : {
            resource: `dataStore/Languages/${al.LanguageName}`,
            params: {
              fields: [
                "meta"
              ]
            }
          }
        }

        const d2 = await this.engine.query(metaQ);


        const langNats = d2.meta?.meta?.categories?.find((p: any) => p.code == 'RT01')
        const langOptions = langNats?.categoryOptions?.map((x: any) => x.id) ?? [];
        const langValues = d2.meta?.meta?.categoryOptionCombos || [];

        let lcategories = [];
        for(let i = 0; i < langOptions.length; i++) {
          const id = langOptions[i];
          lcategories.push(langValues.find((l: any) => l.categoryOptions[0]?.id == id));
        }
      

        console.log("cates", lcategories)

        this.nationalitySelect = lcategories || [];
      }
      // console.log("test13", test13);
      
    } catch (e) {
      console.log('errrruuuooorrrr', e);
    }
  };

  @action getAllLanguages = async (
    languageName?: string,
    language?: any,
    meta?: any
  ) => {
    try {
      const url = `/api/dataStore/Languages`;
      const singleLang = (id: any) => `/api/dataStore/Languages/${id}`;

      const result = await this.engine.link.fetch(url).catch((err: any) => err);

      if (!result?.length) {
        return [];
      }

      let res: any = [];

      let r;
      for (r = 0; r < result?.length; r++) {
        let newRes = await this.engine.link.fetch(singleLang(result[r]));
        res.push(newRes);
      }

      console.log("Result of getting all languages is ", res);
      return res;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  @action checkAttributesNamespaceExists = async () => {
    const nameSpaceUrl = `/api/dataStore/Attributes`;
    let nameSpaceExists = await this.engine.link
      .fetch(nameSpaceUrl)
      .catch((err: any) => err);

    if (!nameSpaceExists?.length) {
      // Create the name space
      await this.engine.link.fetch(`${nameSpaceUrl}/Attributes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });

      nameSpaceExists = await this.engine.link
        .fetch(nameSpaceUrl)
        .catch((err: any) => err)?.length;

      this.attributesExist = !!nameSpaceExists;
    }
  }

  @action getSingleLanguage = async (languageName?: string) => {
    try {
      const url = `/api/dataStore/Languages/${languageName}`;

      const result = await this.engine.link.fetch(url);

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  @action saveNewLang = async (
    languageName?: string,
    language?: any,
    meta?: any
  ) => {
    try {
      const nameSpaceUrl = `/api/dataStore/Languages`;
      const url = `${nameSpaceUrl}/${languageName}`;

      const postObject = JSON.stringify({
        language,
        meta,
      });

      let nameSpaceExists = await this.engine.link
        .fetch(nameSpaceUrl)
        .catch((err: any) => err);

      if (!nameSpaceExists?.length) {
        // Create the name space
        await this.engine.link.fetch(`${nameSpaceUrl}/placeholder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        nameSpaceExists = await this.engine.link
          .fetch(nameSpaceUrl)
          .catch((err: any) => err)?.length;
      }

      const result = await this.engine.link.fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postObject,
      });

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

 
  @action saveActiveLanguage = async (
    langName?: string,
    language?: any,
    ICDLang?: string,
    isUpdate?: boolean
  ) => {
    console.log(
      "\n\n",
      "Result of getting ActiveLanguage language is ",
      false,
      "\n\n"
    );
    try {
      const url = `/api/dataStore/ActiveLanguage/ActiveLanguage`;
      const postObject = JSON.stringify({
        language,
        ICDLang,
      });

      console.log("Post object for active lang is ", postObject);

      const result = await this.engine.link.fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: postObject,
      });

      // const result = await this.engine.link.fetch(url);
      console.log("\n\nResult is ", result);

      return result;
    } catch (error) {
      console.log("\n\nResult is ", error);
      console.log(error);
      return false;
    }
  };

  @action postLanguageMeta = async (meta?: any) => {
    try {
      const updateUrl = "/api/29/metadata";
      const postUrl =
        "/api/metadata.json?importMode=COMMIT&identifier=UID&importReportMode=ERRORS&preheatMode=REFERENCE&importStrategy=CREATE_AND_UPDATE&atomicMode=ALL&mergeMode=MERGE&flushMode=AUTO&skipSharing=true&skipValidation=true&async=true&inclusionStrategy=NON_NULL&format=json";

      const data = await this.engine.query(query);
      const metaExists = !!data.program.programStages[0];
      let url = metaExists ? updateUrl : postUrl;

      const postObject = JSON.stringify(meta);
      console.log("Meta object is ", postObject);

      const result = await this.engine.link.fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postObject,
      });
      console.log("Result of posting new meta is ", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  @action getActiveLanguage = async (defaultLang?: any) => {
    try {
      const url = `/api/dataStore/ActiveLanguage/ActiveLanguage`;

      const result = await this.engine.link.fetch(url);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  @action getICDLanguage = async (defaultLang?: any) => {
    try {
      const url = `/api/dataStore/ActiveLanguage/ICDLanguage`;

      const result = await this.engine.link.fetch(url);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  @action checkIfAdmin = async () => {
    const userDetails = await this.engine.query({
      me: {
        resource: "me.json",
        params: {
          fields: "*,organisationUnits[*]",
        },
      },
    });
    // console.log("Result is ", userDetails?.me.code);
    return userDetails?.me?.code === "admin";
  };

  @action getRegions = async () => {
    try {
      const url =
        "/api/organisationUnits.json?level=2&paging=false&fields=id,displayName,children[id,displayName,children[id,displayName]]";

      // Get the list regions, districts and sub counties
      const result = await this.engine.link.fetch(url);

      console.log("Result of district fetch is ", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  @action getFacilities = async () => {
    try {
      const url =
        "/api/organisationUnits.json?level=5&paging=false&fields=id,displayName";

      // Get the list of all facilities (level 5)
      const result = await this.engine.link.fetch(url);

      console.log("Result of facilities fetch is ", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  @action setActiveLanguage = (lang: any) => {
    this.activeLanguage = lang;
  };

  @action setICDLang = (lang: any) => {
    this.ICDLang = lang;
  };

  @action checkProgramExists = async () => {
    if (this.programExists)
      return true;

    const programData = await this.engine.query({    
      programs:{
          resource: "programs",
          params: {
              fields: [
                  'id',
                  'name'
              ]
          }
      }
  
    });

    this.programExists = programData.programs.programs.some((p: any) => p.id == this.program);
    this.programExists = programData.programs.programs.some((p: any) => p.id == this.program);
    return this.programExists;
  }

  @action createProgram = async () => {
    const metaUrl = `/api/metadata`
    await this.engine.link.fetch(metaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(englishMeta),
    });
  }

  @action
  isUserApproved = async () => {
    try {
      let canApprove = false;

      // Get the logged in users data
      const data = await this.engine.query(query);
      const userName = data.me.name;

      // Get the list of authorized users
      const result = await this.engine.link.fetch(
        "/api/userGroups/nZNrVoI1MSU.json?fields=users[id, name]"
      );

      // Check if the logged in user exists in the list of authorized users
      const users = result.users;
      if (users && isArray(users)) {
        const matchingUser = users.find((item) => item.name === userName);
        if (matchingUser) canApprove = true;
      }

      // If the user exists in the list of authorized users they are approved
      return {
        canApprove,
        userName,
      };
    } catch (e) {
      console.log(e);
      return {
        canApprove: false,
        userName: "",
      };
    }
  };

  @action disableForm = async () => {
    try {
      this.forceDisable = true;
    } catch (e) {
      console.log(e);
    }
  };

  @action enableForm = async () => {
    try {
      this.forceDisable = false;
    } catch (e) {
      console.log(e);
    }
  };

  @action
  loadOrganisationUnitsChildren = async (parent: string) => {
    const query = {
      organisations: {
        resource: `organisationUnits.json`,
        params: {
          filter: `id:in:[${parent}]`,
          paging: "false",
          fields: "children[id,name,path,leaf]",
        },
      },
    };
    try {
      const data = await this.engine.query(query);
      const found = data.organisations.organisationUnits.map((unit: any) => {
        return unit.children.map((child: any) => {
          return { ...child, pId: parent };
        });
      });
      const all = flatten(found);
      this.userOrgUnits = [...this.userOrgUnits, ...all];
    } catch (e) {
      console.log(e);
    }
  };

  @action setSelectedOrgUnit = async (val: any) => {
    try {
      this.selectedOrgUnit = val;
      if (this.canInsert) {
        await this.queryEvents();
      } else {
        this.data = null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action queryEvents = async () => {
    if (this.canInsert) {
      const query1 = {
        events: {
          resource: "events/query.json",
          params: {
            page: this.page,
            pageSize: this.pageSize,
            programStage: this.programStage,
            orgUnit: this.selectedOrgUnit,
            totalPages: "true",
            attributeCc: this.attributeCC,
            attributeCos: this.selectedNationality,
            includeAllDataElements: "true",
            order: this.sorter,
            query: this.search === "" ? "" : `LIKE:${this.search}`,
          },
        },
      };
      try {
        const data = await this.engine.query(query1);
        this.data = data.events;
        this.data.headers = this.data.headers.map((a: any, i: number) => {
          return {
            ...a,
            i,
          };
        });
        this.total = this.data.metaData.pager.total;
      } catch (e) {
        console.log(e);
      }
    }
  };

  @action handleChange = async (pagination: any, filters: any, sorter: any) => {
    const order =
      sorter.field && sorter.order
        ? `${sorter.field}:${sorter.order === "ascend" ? "asc" : "desc"}`
        : "created:desc";
    const page =
      pagination.pageSize !== this.pageSize || order !== this.sorter
        ? 1
        : pagination.current;
    this.sorter = order;
    this.page = page;
    this.pageSize = pagination.pageSize;

    try {
      await this.queryEvents();
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  @action addEvent = async (form: any) => {
    const { eventDate, ...rest } = form;

    console.log("FORM RECEIVED IS ", form);
    const dataValues = Object.entries(rest)

      .map(([dataElement, value]) => {
        if (value instanceof moment) {
          if (dataElement === "i8rrl8YWxLF") {
            value = moment(value).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
          } else {
            value = moment(value).format("YYYY-MM-DD");
          }
        }
        return {
          dataElement,
          value,
        };
      })
      .filter((dv) => !!dv.value);
    console.log("OBJECT ENTRIES ARE:", dataValues);
    let event: any = {
      attributeCategoryOptions: this.selectedNationality,
      orgUnit: this.selectedOrgUnit,
      program: this.program,
      programStage: this.programStage,
      eventDate: moment(eventDate).format("YYYY-MM-DD"),
      dataValues,
    };

    const under = {
      field1: "",
    };

    let createMutation: any = {
      type: "create",
      resource: "events",
      data: event,
    };
    if (this.editing && this.currentEvent) {
      event = { ...event, event: this.currentEvent[0] };
      createMutation = { ...createMutation, data: event };
    }
    try {
      await this.engine.mutate(createMutation);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.showEvents();
  };

  @action deleteEvent = async () => {
    try {
      if (this.currentEvent) {
        const createMutation = {
          type: "delete",
          resource: "events",
          id: this.currentEvent[0],
        };
        await this.engine.mutate(createMutation);
        this.showEvents();
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action causeOfDeathAltSearch = (e: any) => {
    try {
      const DOBA = e;
      console.log(DOBA);
    } catch (e) {
      console.log(e);
    }
    return e;
  };

  @action editEvent = () => {
    this.editing = true;
    this.edit();
    this.showForm();
  };

  @action setAvailableDataElements = (val: any) => {
    this.availableDataElements = val;
  };

  @action includeColumns = (id: any) => (e: any) => {
    const elements = this.availableDataElements.map((col: any) => {
      if (col.id === id) {
        return { ...col, selected: e.target.checked };
      }
      return col;
    });
    this.setAvailableDataElements(elements);
  };

  @action changeDisable = (key: string, value: boolean) => {
    this.allDisabled = { ...this.allDisabled, [key]: value };
  };

  @action disableValue = (key: string) => {
    this.allDisabled = { ...this.allDisabled, [key]: true };
  };

  @action enableValue = (key: string) => {
    this.allDisabled = { ...this.allDisabled, [key]: false };
  };

  @computed
  get organisationUnits() {
    const units = this.userOrgUnits.map((unit: any) => {
      return {
        id: unit.id,
        pId: unit.pId || "",
        value: unit.id,
        title: unit.name,
        isLeaf: unit.leaf,
      };
    });
    return units;
  }

  @computed
  get processedPrograms() {
    return this.programs.map(({ id, name }) => {
      return { id, name };
    });
  }

  @computed get columns() {
    if (
      this.data &&
      this.data.headers.length > 0 &&
      this.data.rows.length > 0
    ) {
      return this.availableDataElements
        .filter((de: any) => de.selected)
        .map((col: any) => {
          const found = this.data.headers.find((c: any) => {
            return col.id === c.name;
          });
          return {
            key: found.name,
            title: found.column,
            dataIndex: found.name,
            render: (text: any, row: any) => {
              return row[found.i];
            },
          };
        });
    }
    return [];
  }

  @computed get currentOrganisation() {
    const current: any = this.programOrganisationUnits.find(
      (u: any) => u.id === this.selectedOrgUnit
    ); /** !!!!!!!!!! */

    // this.programOrganisationUnits.forEach((val) =>
    //   console.log("OR UNIT IS ", val)
    // );
    // console.log("programOrganisationUnits are", this.programOrganisationUnits);
    // console.log("and selectedOrgUnit is ", this.selectedOrgUnit);
    if (current) {
      return current.name;
    }
    return "";
  }

  @computed get canInsert() {
    console.log("this.selectedOrgUnit is ", this.selectedOrgUnit);
    console.log("this.selectedNationality is ", this.selectedNationality);
    console.log("this.currentOrganisation is ", this.currentOrganisation);
    return (
      this.selectedOrgUnit &&
      this.selectedNationality &&
      this.currentOrganisation
    );
  }

  @computed get defaultValues() {
    const dates = [
      "eventDate",
      "RbrUuKFSqkZ",
      "i8rrl8YWxLF",
      "j5TIQx3gHyF",
      "U18Tnfz9EKd",
    ];
    if (this.data && this.data.headers.length > 0 && this.currentEvent) {
      // console.log("we have default values");
      const d = this.data.headers
        .map((c: any) => {
          let value = this.currentEvent[c.i];

          if (dates.indexOf(c.name) !== -1 && value !== "") {
            value = moment(value);
          } else if (value === "true") {
            value = true;
          } else if (value === "false") {
            value = false;
          }
          return [c.name, value];
        })
        .filter((v: any) => !!v[1]);

      const dFromPairs = fromPairs(d);

      return dFromPairs;
    }
    return {};
  }
}

export const store = new Store();
