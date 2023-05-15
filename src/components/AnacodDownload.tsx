import React, { useEffect, useRef, useState } from "react";
import { Button, Menu } from "antd";
import { CSVLink } from "react-csv";
import { useStore } from "../Context";
import { age_ranges } from "../Store";

const AnacodDownload = () => {
   const store = useStore();
   const anacodCsvBtn = useRef(null);
   const [anacodDownloading, setAnacodDownloading] = useState(false);
   const [anacodData, setAnacodData] = useState<any>(null);

   const handleAnacodDownload = async () => {
      if (anacodDownloading) return;
      setAnacodDownloading(true);
      const headers = [
         "country_area",
         "iso3_code",
         "year",
         "data_type",
         "icd_code",
         "sex_code",
         "total_num",
         ...age_ranges,
      ];
      
      const res: any = await store.fetchAnacodData();
      const data: any[] = Object.values(res).map((item: any) => {
         return [
            item.country_area,
            item.iso3_code,
            item.year,
            item.data_type,
            item.icd_code,
            item.sex_code,
            item.total_num,
            ...age_ranges.map((age) => item.age_ranges[age]),
         ]
      });
      setAnacodData([headers, ...data]);
   };

   useEffect(() => {
      console.log("anacodDownloading", anacodDownloading, anacodData);
      if (anacodDownloading && anacodData) {
         setTimeout(() => {
            const btn = anacodCsvBtn.current;
            if (!!btn) btn.link.click();
            setAnacodDownloading(false);
         }, 1000);
      }
   }, [anacodDownloading, anacodData]);

   return (
      <>
         <Button onClick={handleAnacodDownload} type="link" loading={anacodDownloading} size="small">
            Anacod Download
         </Button>
         <CSVLink ref={anacodCsvBtn} data={anacodData ?? []} filename={`anacod.csv`} style={{ display: "none" }} />
      </>
   );
};

export default AnacodDownload;
