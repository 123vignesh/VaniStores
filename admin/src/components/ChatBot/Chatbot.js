import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: 'var(--Tertiary-color)',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: 'var(--Tertiary-color)',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',

};

const config = {
    width: "400px",
    height: "500px",
    floating: true,
};

class SimpleForm extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="Vani Stores ChatBot"
                    hideBotAvatar={true}
                    steps={[
                        {
                            id: 'intro',
                            message: 'How can we help you',
                            trigger: 'intro-user',
                        },
                        {
                            id: 'intro-user',
                            options: [
                                { value: 'y', label: 'Regarding Delivery', trigger: 'yes-response' },
                                { value: 'n', label: 'Sell Books', trigger: 'no-response' },
                                { value: 'd', label: 'Damaged Product', trigger: 'damage-response' },
                            ]
                        },
                        {
                            id: 'yes-response',

                            component: (
                                <div>If Your order not delivered on time please feel free to message us by sending your order id to whatsapp we will try to contact you as soon as we can <a href="https://wa.me/919353087694?text=Hello" style={{ color: "lightgreen" }} target="_blank">Whatsapp Link</a> </div>
                            ),
                            asMessage: true,
                            trigger: 'intro-user',
                        },
                        {
                            id: 'damage-response',
                            component: (
                                <div>If the delivered Book has damages please feel free to mail us regarding the problem by mentioning order Id <a href="mailto:vigneshmsmg2000@gmail.com" style={{ color: "lightgreen", fontSize: "14px", paddingLeft: "2px" }} target="_blank">vigneshmsmg2000@gmail.com</a> </div>
                            ),
                            asMessage: true,
                            end: true,
                        },
                        {
                            id: 'no-response',
                            component: (
                                <div>If You want to sell your second hand books Please feel free to contact us through whatsapp <a href="https://wa.me/919353087694?text=Hello" style={{ color: "lightgreen" }} target="_blank">Whatsapp Link</a> </div>
                            ),
                            asMessage: true,
                            end: true,
                        },
                    ]}
                    {...config}
                />
            </ThemeProvider>
        );
    }

}

export default SimpleForm;