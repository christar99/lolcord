import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    display: ${props => props.isSelected ? "flex" : "none"};
`;

const ChampionImage = styled.div`
    width: 55vw;
    height: 80vh;
    background: linear-gradient(to left, transparent, black), url(${props => props.bgURL});
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
    position: absolute;
    top: calc(10vh + 25px);
    right: 10vw;
    z-index: 1;
`;

const ChampionVideo = styled.div`

`;

const SkillContainer = styled.div`
    width: 25%;
    height: 60%;
    margin-top: 170px;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
    z-index: 26;
`;

const SkillImageContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-evenly;
`;

const SkillDetailContainer = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    margin-top: 15px;
`;

const Skill = styled.div`
    width: 50px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
`;

const SkillImage = styled.div`
    width: 50px;
    height: 50px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center;
    margin-bottom: 2px;
    border: 2px solid ${props => props.selectedSkill ? "brown" : "none"};

    &:hover {
        cursor: pointer;
        border: 2px solid skyblue;
    }
`;

const Shortcuts = styled.span`
    width: 50px;
    height: 10px;
    font-size: 1rem;
    display: flex;
    justify-content: center;
`;

const SkillName = styled.span`
    display: inline-block;
    font-size: 1.5rem;
    margin-bottom: 10px;
`;


const Leveltip = styled.div`
    margin-bottom: 10px;
`;

const Figure = styled.div`
    color: #606060;
    font-size: 0.9rem;
    font-style: italic;
    margin-bottom: 5px;
`;

const Description = styled.p`
    font-size: 1rem;
    margin-bottom: 20px;
`;

const Unprovided = styled.span`
    font-size: 0.9rem;
    font-style: italic;
    color: darkcyan;
`;


const Skills = ({ champion, isSelected }) => {
    const [selectedSkill, setSelectedSkill] = useState("0");
    const [skillInfo, setSkillInfo] = useState(champion.passive);

    const clickSkill = event => setSelectedSkill(event.target.id);

    // skill tooltip에 불필요한 태그 제거 & 필요한태그 바꾸기
    if(selectedSkill !== 0) {
        champion.spells.forEach(skill => {
            //api에 있는 수치 => tooltip에 대입
            const effectValue = skill.tooltip.match(/\{\{\se[0-9]\s\}\}/g);
            let effectNumber = "";
            if(effectValue !== null) {
                effectValue.forEach((effect, index) => {
                    effectNumber = effect.charAt(4);
                    skill.tooltip = skill.tooltip.replace(effectValue[index], `${skill.effectBurn[effectNumber]}`);
                });
            }
            // 불필요한 태그 제거, ?로 변경
            if(skill.tooltip.includes("{")) skill.tooltip = skill.tooltip.replace(/\{\{\s[a-zA-Z0-9*+-/=:]+\s\}\}/g, '?');
            if(skill.tooltip.includes("null")) skill.tooltip = skill.tooltip.replace("null", '?');
            skill.tooltip = skill.tooltip.replace(/\<[/a-zA-Z0-9]+\>/g, '');
        })

        if(champion.passive.description.match(/\<[/a-zA-Z0-9]+\>/g) !== null) {
            champion.passive.description = champion.passive.description.replace(/\<\/?[a-zA-Z0-9=#*+-/ ']+\>/g, '');
        }
    }

    useEffect(() => {
        if(selectedSkill === "0") setSkillInfo(champion.passive);
        else setSkillInfo(champion.spells[selectedSkill - 1]);   
    })



    return (
        <Container isSelected={isSelected}>
            <ChampionImage bgURL={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}/>
            <ChampionVideo
                // hasChampionVideo={}
            />
            <SkillContainer>
                <SkillImageContainer>
                    {/* 패시브스킬 */}
                    <Skill>
                        <SkillImage 
                            bgURL={`https://ddragon.leagueoflegends.com/cdn/11.15.1/img/passive/${champion.passive.image.full}`} 
                            onClick={clickSkill}
                            id={0}
                            selectedSkill={selectedSkill === "0"}
                        />
                        <Shortcuts>passive</Shortcuts>
                    </Skill>

                    {/* qwer스킬 */}
                    {champion && champion.spells.map((skill, index) => {
                        return (
                            <Skill key={skill.id}>
                                <SkillImage 
                                    bgURL={`https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${skill.image.full}`} 
                                    onClick={clickSkill}
                                    id={index === 0 ? 1 : (
                                        index === 1 ? 2 : (
                                            index === 2 ? 3 : (
                                                4
                                            )
                                        )
                                    )}
                                    selectedSkill={selectedSkill === String(index + 1)}
                                />
                                <Shortcuts>
                                    {index === 0 ? "Q" : (
                                        index === 1 ? "W" : (
                                            index === 2 ? "E" : "R"
                                        )
                                    )}
                                </Shortcuts>
                            </Skill>
                        )
                    })}
                </SkillImageContainer>

                <SkillDetailContainer>
                    <SkillName>{skillInfo.name}</SkillName>

                    {/* 패시브를 누르면 안보이게 */}
                    {selectedSkill !== "0" && 
                        <Leveltip>

                            {/* 일반스킬을 클릭했을때 */}
                            {skillInfo.cooldown && skillInfo.cooldown.length === 5 &&
                                <>
                                    <Figure>
                                        재사용대기시간(초): {skillInfo.cooldown[0] === skillInfo.cooldown[4] ? 
                                        skillInfo.cooldown[0] 
                                        : `${skillInfo.cooldown[0]} / ${skillInfo.cooldown[1]} / ${skillInfo.cooldown[2]} / ${skillInfo.cooldown[3]} / ${skillInfo.cooldown[4]}`}
                                    </Figure>
                                    <Figure>
                                        소모값: {skillInfo.cost[0] === skillInfo.cost[4] ? 
                                        skillInfo.cost[0] 
                                        : `${skillInfo.cost[0]} / ${skillInfo.cost[1]} / ${skillInfo.cost[2]} / ${skillInfo.cost[3]} / ${skillInfo.cost[4]}`}
                                    </Figure>
                                    <Figure>
                                        범위: {skillInfo.range[0] === skillInfo.range[4] ? 
                                        skillInfo.range[0] 
                                        : `${skillInfo.range[0]} / ${skillInfo.range[1]} / ${skillInfo.range[2]} / ${skillInfo.range[3]} / ${skillInfo.range[4]}`}
                                    </Figure>
                                </>
                            }

                            {/* 궁극기를 클릭했을때 */}
                            {skillInfo.cooldown && skillInfo.cooldown.length === 3 &&
                                <>
                                    <Figure>
                                        재사용대기시간(초): {skillInfo.cooldown[0] === skillInfo.cooldown[2] ? 
                                        skillInfo.cooldown[0] : `${skillInfo.cooldown[0]} / ${skillInfo.cooldown[1]} / ${skillInfo.cooldown[2]}`}
                                    </Figure>
                                    <Figure>
                                        소모값: {skillInfo.cost[0] === skillInfo.cost[2] ? 
                                        skillInfo.cost[0] : `${skillInfo.cost[0]} / ${skillInfo.cost[1]} / ${skillInfo.cost[2]}`}
                                    </Figure>
                                    <Figure>
                                        범위: {skillInfo.range[0] === skillInfo.range[2] ? 
                                        skillInfo.range[0] : `${skillInfo.range[0]} / ${skillInfo.range[1]} / ${skillInfo.range[2]}`}
                                    </Figure>
                                </>
                            }

                        </Leveltip>
                    }
                    <Description>
                        {selectedSkill === "0" ? skillInfo.description 
                        : (skillInfo.tooltip && skillInfo.tooltip.includes("<br />") ? skillInfo.tooltip.split("<br />").map(line => <span>{line}<br /></span>)
                        : skillInfo.tooltip)}
                    </Description>

                    {selectedSkill !== "0" && 
                    <Unprovided>
                        [?]로 표시된 값은 라이엇API에서 제공하지 않는 데이터입니다.<br/>
                        정확한 값은 LOL클라이언트에서 확인하실 수 있습니다. <br />
                        <br />
                    </Unprovided>}
                </SkillDetailContainer>
                
            </SkillContainer>
        </Container>
    );
}

export default Skills;