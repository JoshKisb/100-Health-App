// To add indicator deaths add an arrar of prefixes

import moment from "moment";

// then go to next comment
const malariaCodePrefixes = [
  "1F4",
  "1D02",
  "DB90",
  "QA08",
  "XN7K1",
  " XM1941",
  "XM37R2",
  "XM5WN6",
  "KA64",
  "QC42",
  "MG55",
  "1C61",
  "JB63",
  "1C62",
];
const tBCodePrefixes = ["1b1", "JB6", "1C6"];
const hivCodePrefixes = [
  "1C62",
  "EB05",
  "EL3Y",
  "9B72",
  "MA14",
  "1C60",
  "1C61",
  "EA94",
  "EA9Y",
  "XN487",
  "XN8LD",
  "XN71W",
  "8A45",
  "8D83",
  "1C62",
  "4B23",
  "6D85",
  "MG24",
  "QA08",
  "QA14",
  "XM3U67",
  "BB01",
  "KA62",
  "QC90",
  "MG53",
  "QC60",
  "XE5CU",
  "JB63",
  "QC6Y",
];
// add the select option matching with prefix array
// then go to EventList file and add the option to the selection component
const deathCodePrefixes = {
  "Malaria Deaths": malariaCodePrefixes,
  "TB Deaths": tBCodePrefixes,
  "HIV Related Deaths": hivCodePrefixes,
};
interface EventFilter {
  apply(diseases: Record<string, any>, filter: string): Record<string, any>;
}

function matchCodePrefixes(prefixes = [], code) {
  let foundCode = false;
  for (let mi = 0; mi < prefixes.length; mi++) {
    // console.log(
    //   "----------------------------code-----------",
    //   code,
    //   prefixes[mi],
    //   code.startsWith(prefixes[mi])
    // );
    foundCode = code.startsWith(prefixes[mi]);
    if (foundCode) break;
  }
  return foundCode;
}

export class CauseOfDeathFilter implements EventFilter {
  apply(diseases: Record<string, any>, filter: string): Record<string, any> {
    if (deathCodePrefixes[filter]) {
      return Object.keys(diseases)
        .filter((key) =>
          matchCodePrefixes(deathCodePrefixes[filter], diseases[key].code)
        )
        .reduce((d, key) => {
          d[key] = diseases[key];
          return d;
        }, {});
    }
    return diseases;
  }
}

export class MortalityFilter implements EventFilter {
  apply(diseases: Record<string, any>, filter: string): Record<string, any> {
    if (filter) {
      Object.keys(diseases).forEach((key) => {
        let count = diseases[key].count;
        if (count > 0 && diseases[key].affected) {
          diseases[key].affected.forEach((d) => {
            const f = filterbyLifeDuration(d.dob, d.dod, filter);
            if (!f ) {
              if(count > 0) count -= 1;
            } 
          });
        }
        diseases[key].count = count;
      });
      return diseases;
    }
    return diseases;
  }
}

export class GenderFilter implements EventFilter {
  apply(diseases: Record<string, any>, filter: string): Record<string, any> {
    if (filter) {
      // return Object.keys(diseases)
      //   .map((key) => {
      //     const d = diseases[key];
      //     const f = d.gender === filter;
      //     // console.log(f, filter);
      //     if (!f && d.count > 0) d.count -= 1;
      //     return d;
      //   })
      //   .reduce((d, c) => {
      //     d[c.name] = c;
      //     return d;
      //   }, {});
        Object.keys(diseases).forEach((key) => {
          let count = diseases[key].count;
          if (count > 0 && diseases[key].affected) {
            diseases[key].affected.forEach((d) => {
              const f = d.gender === filter;
              if (!f ) {
                if(count > 0) count -= 1;
              } 
            });
          }
          diseases[key].count = count;
        });
        return diseases;
    }
    return diseases;
  }
}

function filterbyLifeDuration(
  dob: string,
  dod: string,
  lifeDurationFilter: string
): boolean {
  if (!lifeDurationFilter) return false;
  let foundDuration = false;
  let durationStr = "";
  if (dob) {
    durationStr = moment(dob).from(dod);
  }
  // console.log(lifeDurationFilter, durationStr);
  if (durationStr) {
    
    const parts = durationStr.split(" ");
    const num = +parts[0];
    const period = parts[1];
    switch (lifeDurationFilter) {
      case "Stillbirth":
      case "Early Neonatal":
        foundDuration =
          period.startsWith("day") ||
          period === "week" ||
          period.startsWith("hour") ||
          period.startsWith("minute") ||
          period.startsWith("second");
        break;
      case "Neonatal":
        foundDuration = (period === "weeks" && num <= 4) || period === "month";
        break;
      case "Infant":
        foundDuration =
          (period === "weeks" && num > 4) ||
          period === "months" ||
          period === "year";
        break;
      case "Under-five":
        foundDuration = period === "years" && num <= 5;
        break;
      case "Adolescent":
        foundDuration = period === "years" && num <= 19 && num >= 10;
        break;
      case "Adult":
        foundDuration = period === "years" && num <= 60 && num >= 15;
        break;
    }
    // if(foundDuration) {
    //   console.log(durationStr);
    //   console.log(foundDuration);
    // }
    
  }
  return foundDuration;
}
