import {action, computed, observable} from "mobx";
import {flatten, fromPairs} from 'lodash';
import moment from 'moment';
import { CodeSandboxCircleFilled } from "@ant-design/icons";

const query = {
  me: {
    resource: 'me.json',
    params: {
      fields: '*,organisationUnits[*]'
    }
  },
  program: {
    resource: `programs/vf8dN49jprI`,
    params: {
      fields: 'organisationUnits[id,name],programStages[programStageDataElements[displayInReports,dataElement[id,name]]]'
    }
  },
  options: {
    resource: 'optionSets.json',
    params: {
      fields: 'id,code,options[code,name]',
      paging: 'false',
      filter: 'code:in:[SX01,YN01,MD01,PD01,TI01,100U,100ATPOINT,100RefLevels]'
    }
  }
}

class Store {
  @observable engine: any;
  @observable userOrgUnits: any = [];
  @observable selectedOrgUnit: any;
  @observable programs = [];
  @observable selectedNationality: any;
  @observable optionSets: any
  @observable page = 1;
  @observable pageSize = 10;
  @observable total = 0;
  @observable program = 'vf8dN49jprI';
  @observable programStage = 'aKclf7Yl1PE';
  @observable attributeCC = 'UjXPudXlraY';
  @observable data: any;
  @observable sorter = 'created:desc';
  @observable search = '';
  @observable currentPage = '1';
  @observable programOrganisationUnits = [];
  @observable currentEvent: any;
  @observable viewMode = false;
  @observable editing = false;
  @observable availableDataElements = [];
  @observable ICDAltSearchtextA: any;
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
    T4uxg60Lalw: false
  };

  @action showEvents = () => {
    this.data = null;
    this.edit();
    this.currentEvent = null;
    this.editing = false;
    this.currentPage = '1';
  };
  @action showForm = () => this.currentPage = '2';
  @action setEngine = (engine: any) => this.engine = engine;
  @action edit = () => this.viewMode = false;
  @action view = () => this.viewMode = true;
  @action setCurrentEvent = (event: any) => this.currentEvent = event;
  @action setSelectedNationality = async (nationality: any) => {
    try {
      this.selectedNationality = nationality
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
    try {
      const data = await this.engine.query(query);
      this.userOrgUnits = data.me.organisationUnits;
      const options = data.options.optionSets.filter((o: any) => {
        return !!o.code
      }).map((optionSet: any) => {
        return [optionSet.code, optionSet.options]
      });
      const units = data.program.organisationUnits;
      this.programOrganisationUnits = units;
      this.optionSets = fromPairs(options);
      const programStage = data.program.programStages[0];
      this.availableDataElements = programStage.programStageDataElements.map((de: any) => {
        return {...de.dataElement, selected: de.displayInReports};
      });
    } catch (e) {
      console.log(e);
    }
  }

  @action
  loadOrganisationUnitsChildren = async (parent: string) => {
    const query = {
      organisations: {
        resource: `organisationUnits.json`,
        params: {
          filter: `id:in:[${parent}]`,
          paging: 'false',
          fields: 'children[id,name,path,leaf]'
        }
      },
    }
    try {
      const data = await this.engine.query(query);
      const found = data.organisations.organisationUnits.map((unit: any) => {
        return unit.children.map((child: any) => {
          return {...child, pId: parent}
        })
      });
      const all = flatten(found);
      this.userOrgUnits = [...this.userOrgUnits, ...all];
    } catch (e) {
      console.log(e);
    }
  }

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
  }

  @action queryEvents = async () => {
    if (this.canInsert) {
      const query1 = {
        events: {
          resource: 'events/query.json',
          params: {
            page: this.page,
            pageSize: this.pageSize,
            programStage: this.programStage,
            orgUnit: this.selectedOrgUnit,
            totalPages: 'true',
            attributeCc: this.attributeCC,
            attributeCos: this.selectedNationality,
            includeAllDataElements: 'true',
            order: this.sorter,
            query: this.search === '' ? '' : `LIKE:${this.search}`,

          }
        }
      }
      try {
        const data = await this.engine.query(query1);
        this.data = data.events;
        this.data.headers = this.data.headers.map((a: any, i: number) => {
          return {
            ...a,
            i
          }
        });
        this.total = this.data.metaData.pager.total
      } catch (e) {
        console.log(e);
      }
    }
  }


  @action handleChange = async (pagination: any, filters: any, sorter: any) => {
    const order = sorter.field && sorter.order ? `${sorter.field}:${sorter.order === 'ascend' ? 'asc' : 'desc'}` : 'created:desc';
    const page = pagination.pageSize !== this.pageSize || order !== this.sorter ? 1 : pagination.current;
    this.sorter = order;
    this.page = page;
    this.pageSize = pagination.pageSize

    try {
      await this.queryEvents()
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  @action addEvent = async (form: any) => {
    const {eventDate, ...rest} = form;
    const dataValues = Object.entries(rest).map(([dataElement, value]) => {
      if (value instanceof moment) {
        if (dataElement === 'i8rrl8YWxLF') {
          value = moment(value).format('YYYY-MM-DDTHH:mm:ss.SSSZ')

        } else {
          value = moment(value).format('YYYY-MM-DD')
        }
      }
      return {
        dataElement,
        value
      }
    }).filter((dv) => !!dv.value);

    let event: any = {
      attributeCategoryOptions: this.selectedNationality,
      orgUnit: this.selectedOrgUnit,
      program: this.program,
      programStage: this.programStage,
      eventDate: moment(eventDate).format('YYYY-MM-DD'),
      dataValues
    }


    const under = {
      field1: ''
    }


    let createMutation: any = {
      type: 'create',
      resource: 'events',
      data: event
    }
    if (this.editing && this.currentEvent) {
      event = {...event, event: this.currentEvent[0]}
      createMutation = {...createMutation, data: event}
    }
    try {
      await this.engine.mutate(createMutation);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.showEvents();
  }

  @action deleteEvent = async () => {
    try {
      if (this.currentEvent) {
        const createMutation = {
          type: 'delete',
          resource: 'events',
          id: this.currentEvent[0]
        }
        await this.engine.mutate(createMutation);
        this.showEvents();
      }

    } catch (e) {
      console.log(e);
    }
  }

  @action causeOfDeathAltSearch =  (e: any) => {
    try {
 const DOBA = e
      console.log(DOBA)
      

    } catch (e) {
      console.log(e);
    }
    return e
  }

  @action editEvent = () => {
    this.editing = true;
    this.edit();
    this.showForm();
  }

  @action setAvailableDataElements = (val: any) => {
    this.availableDataElements = val;
  }

  @action includeColumns = (id: any) => (e: any) => {
    const elements = this.availableDataElements.map((col: any) => {
      if (col.id === id) {
        return {...col, selected: e.target.checked}
      }
      return col;
    });
    this.setAvailableDataElements(elements);
  }

  @action changeDisable = (key: string, value: boolean) => {
    this.allDisabled = {...this.allDisabled, [key]: value}
  }

  @action disableValue = (key: string) => {
    this.allDisabled = {...this.allDisabled, [key]: true}
  }

  @action enableValue = (key: string) => {
    this.allDisabled = {...this.allDisabled, [key]: false}
  }

  @computed
  get organisationUnits() {
    const units = this.userOrgUnits.map((unit: any) => {
      return {id: unit.id, pId: unit.pId || '', value: unit.id, title: unit.name, isLeaf: unit.leaf}
    });
    return units;
  }

  @computed
  get processedPrograms() {
    return this.programs.map(({id, name}) => {
      return {id, name}
    })
  }

  @computed get columns() {
    if (this.data && this.data.headers.length > 0 && this.data.rows.length > 0) {
      return this.availableDataElements.filter((de: any) => de.selected).map((col: any) => {
        const found = this.data.headers.find((c: any) => {
          return col.id === c.name;
        });
        return {
          key: found.name,
          title: found.column,
          dataIndex: found.name,
          render: (text: any, row: any) => {
            return row[found.i]
          }
        }
      });
    }
    return []
  }

  @computed get currentOrganisation() {
    const current: any = this.programOrganisationUnits.find((u: any) => u.id === this.selectedOrgUnit);
    if (current) {
      return current.name;
    }
    return ''
  }

  @computed get canInsert() {
    return this.selectedOrgUnit && this.selectedNationality && this.currentOrganisation;
  }

  @computed get defaultValues() {
    const dates = ['eventDate', 'RbrUuKFSqkZ', 'i8rrl8YWxLF', 'j5TIQx3gHyF', 'U18Tnfz9EKd']
    if (this.data && this.data.headers.length > 0 && this.currentEvent) {
      const d = this.data.headers.map((c: any) => {
        let value = this.currentEvent[c.i];
        if (dates.indexOf(c.name) !== -1) {
          value = moment(value);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        return [c.name, value];
      }).filter((v: any) => !!v[1]);
      return fromPairs(d);
    }
    return {};
  }
}

export const store = new Store();
