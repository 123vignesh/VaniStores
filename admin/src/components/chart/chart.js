import ChartLayout from "./chartLayout";
import styled from "styled-components";

const Chart = () => {
    const StyledWrapper = styled.div``;

    const StyledCard = styled.div`
      margin: 0 0 1rem;
      padding: 1rem;
      background: #040404;
      border: 6px solid #bdbdbd;
      background-clip: border-box;
      border-radius: 1rem;
      min-width: 1000px;
      height: 480px;
      padding-bottom:100px;
    `;


    let s = 100
    const data = []
    const name = ["Prod1", "Prod2", "Prod3", "Prod4", "Prod5", "Prod6", "Prod7", "Prod8", "Prod9", "Prod10", "Prod11", "Prod12", "Prod13", "Prod14", "Prod15", "Prod16", "Prod17", "Prod18", "Prod19", "Prod20", "Prod21", "Prod22", "Prod23", "Prod24"]
    for (let i = 0; i < name.length; i++) {
        data.push({
            name: name[i],
            a: i % 2 ? s + i * 2 : s - i * 2,
            b: i % 2 ? s + i * 2 : s - i * 2
        })
    }
    const bars = [
        { key: "a", fill: "#008080" },
        { key: "b", fill: "#212022" }
    ]
    return (
        <>

            <StyledWrapper>

                <StyledCard>
                    <h2 style={{ color: "#008080", fontSize: "30px" }}>Products Statistic</h2>
                    <ChartLayout
                        bars={bars}
                        data={data}
                    />
                </StyledCard>
            </StyledWrapper>
        </>
    )

}

export default Chart;