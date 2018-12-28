import common from './common' // 公共接口
import * as auth from './auth'
import course from './course'
import * as card from './card'
import * as sence from './sence'
import * as payment from './payment'
import * as push from './push'
import * as share from './share'
import * as team from './team'
import * as contact from './contact'
import * as score from './score'
import * as practice from './practice'
import * as report from './report'
import registered from './registered' // 新增的接口，待整合

import _ from 'underscore'
const fetch = _.extend(common, course, registered)

export {
    fetch,
    auth,
    card,
    sence,
    payment,
    push,
    share,
    team,
    contact,
    score,
    practice,
    report
}
