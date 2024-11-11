from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)

# 启用 CORS
CORS(app, origins="http://127.0.0.1:8000", supports_credentials=True)
CORS(app, origins="http://127.0.0.1:5000", supports_credentials=True)
CORS(app, origins="*", supports_credentials=True)

# 存储抽奖数据的文件
LOTTERY_FILE = 'data/lottery_data.json'

# 获取现有的抽奖数据
def get_lottery_data():
    if os.path.exists(LOTTERY_FILE):
        with open(LOTTERY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

# 保存抽奖数据
def save_lottery_data(data):
    with open(LOTTERY_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

@app.route('/lottery.html')
def lottery_page():
    lottery_id = request.args.get('id')  # 获取 URL 中的 id 参数
    if lottery_id:
        return render_template('lottery.html', lottery_id=lottery_id)
    return "抽奖项目 ID 缺失", 400  # 如果没有传递 id，返回错误

@app.route('/save-prize', methods=['POST'])
def save_prize():
    data = request.get_json()
    lottery_data = get_lottery_data()

    # 创建新的抽奖序号 ct
    ct = str(len(lottery_data) + 1)
    data['ct'] = ct
    data['participants'] = []

    lottery_data[ct] = data

    save_lottery_data(lottery_data)
    return jsonify({'message': '数据已保存', 'ct': ct})

@app.route('/get-lottery/<lottery_id>', methods=['GET'])
def get_lottery(lottery_id):
    lottery_data = get_lottery_data()
    lottery = lottery_data.get(lottery_id)

    if not lottery:
        return jsonify({'error': '抽奖数据不存在'}), 404

    return jsonify(lottery)



import random

@app.route('/join-lottery/<lottery_id>', methods=['POST'])
def join_lottery(lottery_id):
    # 获取当前的抽奖数据
    lottery_data = get_lottery_data()
    lottery = lottery_data.get(lottery_id)

    if not lottery:
        return jsonify({'error': '抽奖数据不存在'}), 404

    # 获取请求中的昵称
    data = request.get_json()
    nickname = data.get('nickname')

    if not nickname:
        return jsonify({'error': '昵称不能为空'}), 400

    # 计算剩余奖品的总数量
    remaining_prizes = []
    for prize in lottery['prizes']:
        # 确保 count 是整数类型
        count = int(prize['count'])  # 转换为整数
        if count > 0:
            remaining_prizes.append(prize)

    # 如果没有剩余奖品
    if not remaining_prizes:
        return jsonify({'error': '所有奖品已抽完'}), 400

    # 随机抽取一个奖品
    chosen_prize = random.choice(remaining_prizes)

    # 更新奖品数量
    for prize in lottery['prizes']:
        if prize['prize'] == chosen_prize['prize']:
            prize['count'] = int(prize['count']) - 1  # 减去一个奖品
            break

    # 更新抽奖数据
    lottery['participants'].append({'nickname': nickname, 'prize': chosen_prize['prize']})

    # 保存更新后的抽奖数据
    save_lottery_data(lottery_data)

    # 返回抽奖结果
    return jsonify({'message': f'恭喜 {nickname} 抽中了 {chosen_prize["prize"]}！'}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # 确保端口是5000