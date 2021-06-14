import React, { useEffect, useState } from 'react';
import { itemAPI } from 'API';
import ItemPresenter from './ItemPresenter';



const ItemContainer = () => {
  const [key, setKey] = useState();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState();
  const [searchValue, setSearchValue] = useState();
  const [clickedItem, setClickedItem] = useState();
  const [imageURL, setImageURL] = useState();
  const [checkedId, setCheckedId] = useState(new Set());
  const [checkedFilter, setCheckedFilter] = useState();

  const fetchURL = async () => {
    const result = await itemAPI;
    let itemValue = Object.values(result.data.data);

    /// API다듬기
    // 하.. 아이템별 분류 직접해야함 롤 api tlqkf
    // setItem 저장시키기 전에 객체추가
    let group = {
      start: [11, 15, 20, 21, 22, 25, 26, 27, 30, 31, 34, 73, 130, 131, 132, 144, 147, 150, 153],
      basic: [0, 1, 2, 4, 5, 6, 7, 8, 10, 12, 13, 14, 16, 18, 24, 41],
      epic: [3, 9, 17, 19, 23, 29, 49, 50, 52, 53, 57, 62, 64, 66, 68, 70, 71, 78, 79, 81, 84, 91, 93, 96, 98, 99, 102, 103, 105, 106, 109, 112, 115,
        118, 125, 127, 141, 142, 156, 162, 163, 165, 168, 169, 171, 183, 186, 192],
      legend: [46, 47, 48, 51, 54, 55, 56, 58, 60, 63, 65, 67, 69, 74, 75, 76, 77, 82, 83, 85, 86, 87, 88, 89, 90, 92, 94, 95, 100,
        101, 104, 107, 108, 110, 111, 114, 116, 117, 119, 121, 122, 126, 128, 134, 135, 139, 140, 143, 158, 160, 161, 167, 170, 172,
        173, 174, 175, 190, 191, 196, 197],
      myth: [35, 72, 80, 113, 124, 157, 164, 166, 176, 177, 178, 179, 180, 181, 182, 184, 185, 187, 188, 189, 193, 194, 195]
    } 

    for (let type in group) {
      group[type].forEach(index => itemValue[index].group = type);
    }

    itemValue = itemValue.filter(item => item.group !== undefined);

    // api 수정
    // 아이템을 가격 내림차순으로 정렬
    itemValue = itemValue.sort((a, b) => a.gold.total - b.gold.total);

    // filter에 사용할 tags 수정
    itemValue.forEach(item => {
      let index = null;
      if(item.tags.includes('HealthRegen')) {
        index = item.tags.indexOf('HealthRegen');
        item.tags[index] = 'Health';
      }
      else if(item.tags.includes('ManaRegen')) {
        index = item.tags.indexOf('ManaRegen');
        item.tags[index] = 'Mana';
      } 
      else if(item.tags.includes('Boots')) {
        index = item.tags.indexOf('Boots');
        item.tags[index] = 'NonbootsMovement';
      }
    })

    // items.description이 string이 xml로 되어있어 불필요한 xml태그 제거
    let description = itemValue.map(item => item.description);

    if(typeof description[0] === "string") description = description.map(item => item.replace(/<li>/g, '<br><br>- '));
    
    // description 안의 rules태그, flavorText태그 가진애들만 따로 빼서 걔네는 아이템의 객체로 저장해야함
    let rules = [];
    let flavorText = [];
    rules = additionalDescription('rules', description);
    flavorText = additionalDescription('flavorText', description);


    if(typeof description[0] === "string") description = description.map(item => item.split('<br>').map(token => token.replace(/<\/?[a-zA-Z]+>/g, '')));

    itemValue.forEach((item, index) => { 
      item.description = description[index];
      item.rules = rules[index];
      item.flavorText = flavorText[index];
    });

    setItems(itemValue);
    setKey(Object.keys(result.data.data));
    setLoading(false);
    setImageURL("http://ddragon.leagueoflegends.com/cdn/11.11.1/img/item/");
  }

  useEffect(() => fetchURL(), []);



  //태그빼내는 함수(필요한 xml태그)
  const additionalDescription = (str, itemsDescription) => {
    let index = itemsDescription.map(item => item.indexOf(str));
    let results = [];
    index.forEach((token, i) => {
      if(token > 0) {
        results[i] = itemsDescription[i].substring(token -1);
        itemsDescription[i] = itemsDescription[i].substring(0, token -1);
      }
    });
    results = results.map(token => token.replace(/<\/?[a-zA-Z]+>/g, ''));
    return results;
  }
 


  // 검색시 글자바뀌는 함수
  const handleChange = event => {
    let searchItem = [];
    if (event && items) {
      if(!checkedFilter) {
        searchItem = items.filter(item => item.name.includes(event.target.value));
        setSearchValue(searchItem);
      } 
      else {
        searchItem = checkedFilter.filter(item => item.name.includes(event.target.value));
        setSearchValue(searchItem);
      }
    }
  }

  // 아이템 클릭시 상세보기
  const handleClick = event => {
    let itemProps;
    if (event && items) {
      itemProps = items.filter(item => item.image.full === event.target.id);
      setClickedItem(itemProps[0]);
    }
  }



  // 필터 클릭시 이벤트
  const handleCheck = event => {
    let isChecked = event.target.checked;
    
    // 필터 체크할 때 필터이름 추가 
    if(isChecked) checkedId.add(event.target.id);
    // 체크해제시 삭제
    else if (!isChecked && checkedId.has(event.target.id)) checkedId.delete(event.target.id);
    
    setCheckedId(checkedId);

    //저장한 필터 id를 아이템항목으로 치환

    let enableItem = [];
    [...checkedId].forEach((token, index) => {
      if(index === 0) enableItem = items.filter(item => item.tags.includes(token));
      else enableItem = [...enableItem].filter(item => item.tags.includes(token));
    })  
    setCheckedFilter(enableItem);
  }
  
  
  

  return (
    <ItemPresenter
      items={items}
      key={key}
      id={key}
      loading={loading}
      imageURL={imageURL}
      handleChange={handleChange}
      searchValue={searchValue}
      handleClick={handleClick}
      clickedItem={clickedItem}
      handleCheck={handleCheck}
      checkedFilter={checkedFilter}
    />
  );
}


export default ItemContainer;
