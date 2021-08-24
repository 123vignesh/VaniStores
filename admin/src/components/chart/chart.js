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
      min-width: 1200px;
      height: 480px;
      padding-bottom:100px;
      @media (min-width: 768px) {
        min-width: 700px;
      }
     
      @media (min-width: 1024px) {
        min-width: 1200px;
      }
    `;


    let s = 100
    const data = []
    const name = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"]
    for (let i = 0; i < name.length; i++) {
        data.push({
            name: name[i],
            a: i % 2 ? s + i * 2 : s - i * 2,
            b: i % 2 ? s + i * 2 : s - i * 2
        })
    }
    const bars = [
        { key: "a", fill: "var(--Tertiary-color)" },
        { key: "b", fill: "var(--Secondary-color)" }
    ]
    return (
        <>

            <StyledWrapper>

                <StyledCard>
                    <h2 style={{ color: "var(--Tertiary-color)", fontSize: "30px" }}>Subscribers</h2>
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