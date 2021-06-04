import React, { useEffect, useState } from 'react';
import { itemAPI } from 'API';
import ItemPresenter from './ItemPresenter';



const ItemContainer = () => {
  const [keys, setKeys] = useState();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState();
  const [searchValue, setSearchValue] = useState();

  const fetchURL = async () => {
    const result = await itemAPI;
    const itemValue = Object.values(result.data.data);

    // 하.. 아이템별 분류 직접해야함 롤 api tlqkf
    // setItem 저장시키기 전에 객체추가
    if (itemValue !== undefined) {
      const group = {
        start: [11, 15, 20, 21, 22, 25, 26, 27, 30, 31, 34, 73, 130, 131, 132, 144, 147, 150, 153],
        basic: [0, 1, 2, 4, 5, 6, 7, 8, 10, 12, 13, 14, 16, 18, 24, 41],
        epic: [3, 9, 17, 19, 23, 29, 49, 50, 52, 53, 57, 62, 64, 66, 68, 70, 71, 78, 79, 81, 84, 91, 93, 96, 98, 99, 102, 103, 105, 106, 109, 112, 115,
          118, 125, 127, 141, 142, 156, 162, 163, 165, 169, 171, 183, 186, 192],
        legend: [46, 47, 48, 51, 54, 55, 56, 58, 60, 63, 65, 67, 69, 74, 75, 76, 77, 82, 83, 85, 86, 87, 88, 89, 90, 92, 94, 95, 100,
          101, 104, 107, 108, 110, 111, 114, 116, 117, 119, 121, 122, 126, 128, 134, 135, 139, 140, 143, 158, 160, 161, 167, 170, 172,
          173, 174, 175, 190, 191, 196, 197],
        myth: [35, 72, 80, 113, 124, 157, 164, 166, 176, 177, 178, 179, 180, 181, 182, 184, 185, 187, 188, 189, 193, 194, 195]
      }

      for(let type in group) {
        group[type].map(index => itemValue[index].group = type);
      }
    }

    // 아이템을 가격 내림차순으로 정렬해서 저장
    setItems(itemValue.sort((a, b) => a.gold.total - b.gold.total));
    setKeys(Object.keys(result.data.data));
    setLoading(false);
  }

  const handleChange = event => {
    if(event) setSearchValue(event.target.value);
  }

  useEffect(() => {
    fetchURL();
    handleChange();
  }, []);

  return (
    <ItemPresenter
      items={items}
      keys={keys}
      loading={loading}
      handleChange={handleChange}
      searchValue={searchValue}
    />
  );
}


export default ItemContainer;
