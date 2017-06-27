export const treeData = [
    {
        key: 'food',
        label: '食品',
        children: [
            {
                key: 'mainfood',
                label: '主食',
                children: [
                    {
                        key: 'noodle',
                        label: '面',
                    },
                    {
                        key: 'rice',
                        label: '米饭',
                    },
                    {
                        key: 'chaocai',
                        label: '炒菜',
                        children: [
                            {
                                key: 'chuan',
                                label: '川菜',
                            },
                            {
                                key: 'xiang',
                                label: '湘菜',
                            },
                            {
                                key: 'yue',
                                label: '粤菜',
                            }
                        ]
                    }
                ]
            }, 
            {
                key: 'fruit',
                label: '水果',
                children: [
                    {
                        key: 'apple',
                        label: '苹果',
                    },
                    {
                        key: 'xigua',
                        label: '西瓜',
                    },
                    {
                        key: 'putao',
                        label: '葡萄',
                        children: [
                            {
                                key: 'hutai',
                                label: '沪太8号',
                            },
                            {
                                disabled: true,
                                key: 'hutai9',
                                label: '沪太9号',
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
