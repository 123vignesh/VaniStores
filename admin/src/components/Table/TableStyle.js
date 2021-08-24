import styled from 'styled-components'

export var Styles = styled.div`
  padding: 1rem;

  table {
    border-radius:10px;
    margin: 25px 0;
    font-size: 1.1em;
    min-width: 1200px;
    box-shadow: 0 1rem 1.25rem 0 #12151a,
    0 -0.25rem 1.5rem var(--Secondary-color) inset,
    0 0.75rem 0.5rem #ffffff66 inset,
    0 0.25rem 0.5rem 0 var(--Primary-color) inset;
    
    tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

    th,
    td {
        padding: 12px 15px;

      :last-child {
    
      }
    }
th{
    font-size:1.2em;
    color:black;
   
}
    td {
      background-color:var(--Table-color);
      
    }
    tr{
        background-color:var(--Tertiary-color);
        color: black;
        text-align: left;
        border-radius:20px;
       
    }
    tbody tr{
        border-bottom: 1px solid var(--Quarterinary-color);
    }
    tbody tr:nth-of-type(even) {
        background-color:var(--Tertiary-color);
    }
    tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }
    tbody tr.active-row {
        font-weight: bold;
        color: var(--Tertiary-color);
    }
  }
  .pagination {
    padding: 0.5rem;
  }

  @media only screen and (max-width: 600px) {
    table{
      min-width:200px;
    }    
  }

@media only screen and (min-width: 600px) {

table{
  min-width:700px;
}
  
  }
  
  @media only screen and (min-width: 768px) {
    table{
      min-width:700px;
    }
  }
  
 @media only screen and (min-width: 992px) {
  table{
    min-width:900px;
  }
 }

@media only screen and (min-width: 1200px) {
  table{
    min-width:1200px;
  }
}
`;
