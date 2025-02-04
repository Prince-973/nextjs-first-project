import React, { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  //   const { data, error } = useSWR(
  //     "https://nextjs-project-6657f-default-rtdb.asia-southeast1.firebasedatabase.app/Sales.json"
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       console.log(data);

  //
  //       console.log(transformedSales);

  //       setSales(transformedSales);
  //     }
  //   }, [data]);
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://nextjs-project-6657f-default-rtdb.asia-southeast1.firebasedatabase.app/Sales.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            userName: data[key].userName,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // console.log(data);

    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.userName} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
}

export default LastSalesPage;
