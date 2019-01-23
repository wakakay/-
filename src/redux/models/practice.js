import {practice as practiceApi } from '../../api'

// Contents
const CARDS_GAP = 5
export const SET_COURSE_ID_OF_PRACTICES = 'SET_COURSE_ID_OF_PRACTICES'
export const SET_SENCE_ID_OF_PRACTICES = 'SET_SENCE_ID_OF_PRACTICES'
export const SET_TEAM_ID_OF_PRACTICES = 'SET_TEAM_ID_OF_PRACTICES'
export const SET_PRACTICES = 'SET_PRACTICES'
export const GET_PRACTICES = 'GET_PRACTICES'
export const SET_PREVIOUS_PRACTICES = 'SET_PREVIOUS_PRACTICES'
export const DROP_PRACTICES = 'DROP_PRACTICES'
export const SET_CURRENT_SECTION_OFFSET = 'SET_CURRENT_SECTION_OFFSET'
export const SET_REQUEST_FLAG = 'SET_REQUEST_FLAG'
export const FAILURE = 'FAILURE'
export const SET_LAST_SECTION_OFFSET = 'SET_LAST_SECTION_OFFSET'
export const SET_PRACTICES_SUBMIT = 'SET_PRACTICES_SUBMIT'
export const DROP_PRACTICES_SUBMIT = 'DROP_PRACTICES_SUBMIT'

const customErrActionBundle = {
    type: FAILURE,
    payload: {
        status: 'failure',
        response: {},
        error: { message: '错误' }
    } // end payload
}

export const setCourseID = id => ({
    type: SET_COURSE_ID_OF_PRACTICES,
    payload: {
        id
    }
})

export const setSenceID = id => ({
    type: SET_SENCE_ID_OF_PRACTICES,
    payload: {
        id
    }
})

export const setTeamID = id => ({
    type: SET_TEAM_ID_OF_PRACTICES,
    payload: {
        id
    }
})

// sync Actions creators
export const setPractices = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_PRACTICES, payload: { practices: response } }) : customErrActionBundle

export const setSubmitSection = ({ status = 'pending', response = {}, error = { message: 'Oops' } }) => 'success' === status ? ({ type: SET_PRACTICES_SUBMIT, payload: { practices: response } }) : customErrActionBundle

export const setRequestFlag = timestamp => ({
    type: SET_REQUEST_FLAG,
    payload: {
        timestamp
    }
})

export const setLastPracticeOffset = pOffset => {
    return {
        type: SET_LAST_SECTION_OFFSET,
        payload: {
            offset: pOffset
        }
    } // end return
}

export const setCurrentPracticeOffset = pOffset => {
        return {
            type: SET_CURRENT_SECTION_OFFSET,
            payload: {
                offset: pOffset
            }
        } // end return
    } // end setCurrentPracticeOffset

export const resetCurrentPracticeOffset = () => {
        return {
            type: SET_CURRENT_SECTION_OFFSET,
            payload: {
                offset: 0
            }
        }
    } // end resetCurrentPracticeOffset

export const dropAppointedCardAnimation = offset => {
    return {
        type: DROP_APPOINTED_CARD_ANIMATION,
        payload: {
            offset
        }
    }
}

export const fetchPreviousPractices = ({ token, senceID, courseID, teamID, examID }) => (dispatch, getState) => { //-------------------------------->>>>
    // console.log('sence id', senceID)
    // console.log('course id', courseID)

    const requestFlag = Date.now()
    dispatch(setPractices({ status: 'pending' }))
    dispatch(setSubmitSection({ status: 'pending' }))
        // dispatch(setRequestFlag(requestFlag))
        // dispatch(setCourseID(courseID))
    dispatch(setSenceID(examID))
        // return dispatch(setLastPracticeOffset(11))
    return practiceApi.getExamPracticeList({ token, examID, senceID, courseID, requestFlag, teamID })
        .then(({ practiceList, examTitle, buttonStatus }) => {
            if (buttonStatus === 'done')
                return 'done'
                    // return
            dispatch(setPractices({
                status: 'success',
                response: practiceList && practiceList.map(item => formatAppointedPreviousItem({ item, senceName: examTitle }))
                    // .concat({ type: 'front', description: '这个是测试场景描述方案，内容将两不要超过四行。这个是测试场景描述方案，内容将两不要超过四行。这个是测试场景描述方案，内容将两不要超过四行。', isView: true, title: '测一测' })
            }))
            let submitList = []
            for (let one in practiceList) {
                submitList.push({ optionID: '', practiceTypeID: '' })
            }
            dispatch(setSubmitSection({
                status: 'success',
                response: submitList
            }))
            return 'notDone'
        })
        .catch(error => {
            // console.log('fetch cards error', error)
            dispatch(setPractices({ status: 'failure', error }))
            throw error
        })
}

export const clearCardsSections = () => ({
    type: CLEAR_CARDS_SECTIONS
})


const formatAppointedItem = ({ item, senceIndex, senceCount }) => {
        return item
    } // end formatAppointedItem

const formatAppointedPreviousItem = ({ item, senceName }) => {
        return {...item, senceName }
    } // end formatAppointedItem

const formatOrderItem = ({ item }) => {
        if ('order' !== item.type && 'order' !== item['fragment']['orginalType']) return item
            // let feedback = item && item.feedbackType3
        let sourceList = (function(aArr) {
            let iLength = aArr.length,
                i = iLength,
                mTemp,
                iRandom

            while (i--) {
                if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                    mTemp = aArr[i]
                    aArr[i] = aArr[iRandom]
                    aArr[iRandom] = mTemp
                }
            }

            return aArr
        })(item.select)
        let orderList = sourceList.map(blob => ({ optionID: blob.id, isAnswer: false, weight: blob.weight }))
        let mapper = {}
        for (let [index, blob] of orderList.entries()) {
            mapper[blob.optionID] = { order: index, isAnswer: blob.isAnswer }
        } // end for
        return {...item, sourceList, orderList, mapper, isAnchorFooterShown: true }
    } // end formatOrderItem

const formatTextSelectionVer2Item = ({ item }) => {
    if ('textSelectionVer2' !== item.type) return item
    return {...item, isAnchorFooterShown: true }
}

const calculateCardsWhichShouldBeShown = ({ length, gap, now }) => {
    if (gap < 5) return false
    if (0 === gap % 2) return false
    let mStep = (gap - 1) / 2
    let mAddition = (now + mStep > length) ? (length - now) : mStep // 临界点判断
    let mReduction = 0 === now ? 0 : (now - mStep < 0) ? (now - mStep) : -mStep // 临界点判断
    if (now < mStep) mAddition = mStep + Math.abs(now - mStep)
    if (now + mStep > length) mReduction = -mStep - (now + mStep - length)
    let mMax = now + mAddition
    let mMin = now + mReduction
        // console.log(`当前是第几页: ${now}, 当前往前需要补足页数: ${mReduction}, 当前往后需要补足页数: ${mAddition}, 取值范围: [${mMin} - ${mMax}]`)
    let mArr = []
    while (mMax - mMin >= 0) {
        mArr.push(mMax--)
    }
    return mArr
}

// Action Handlers
const ACTIONS_HANDLERS = {
        [SET_PRACTICES]: (practices, action) => {
            let nextState = Object.assign({}, practices, { sections: action.payload.practices })
            return nextState
        },
        [DROP_PRACTICES]: (practices, action) => {
            return Object.assign({}, practices, { sections: [] })
        },
        [SET_REQUEST_FLAG]: (practices, { payload: { timestamp } }) => {
            return Object.assign({}, practices, { requestFlag: timestamp })
        },
        [SET_CURRENT_SECTION_OFFSET]: (practices, { payload: { offset } }) => {
            let nextState = practices
            return Object.assign({}, practices, { currentSectionOffset: offset })
        },
        [SET_COURSE_ID_OF_PRACTICES]: (practices, { payload: { id } }) => {
            return Object.assign({}, practices, { courseID: id })
        },
        [SET_SENCE_ID_OF_PRACTICES]: (practices, { payload: { id } }) => {
            return Object.assign({}, practices, { senceID: id })
        },
        [SET_TEAM_ID_OF_PRACTICES]: (practices, { payload: { id } }) => {
            return Object.assign({}, practices, { teamID: id })
        },
        [SET_LAST_SECTION_OFFSET]: (practices, { payload: { offset } }) => {
            // console.log('test set last offset', practices, offset)
            let temp = practices.lastSectionOffset
            if (offset === -1 || offset > temp) {
                return Object.assign({}, practices, { lastSectionOffset: offset })
            }
            return Object.assign({}, practices, { lastSectionOffset: temp })
        },
        [SET_PRACTICES_SUBMIT]: (practices, action) => {
            let nextState = Object.assign({}, practices, { submitSections: action.payload.practices })
            return nextState
        },
        [DROP_PRACTICES_SUBMIT]: (practices, action) => {
            return Object.assign({}, practices, { submitSections: [] })
        },
    } // end handlers


// practicesReducer
export const practicesReducer = (practice = {
    requestFlag: '', // 进入课程请求时间戳
    currentSectionOffset: 0,
    courseID: 'defaultCourseID',
    senceID: 'defaultSenceID',
    teamID: 'defaultTeamID',
    sections: [],
    lastSectionOffset: -1, //已经做到哪题 测评使用
    submitSections: [], //统一上传做题数据

}, action) => {
    const handler = ACTIONS_HANDLERS[action.type]
    return handler ? handler(practice, action) : practice
}
