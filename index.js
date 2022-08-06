class GasCostCalculator {

    constructor() {
        this.data = {};
        this.result = {};
    }// constructor

    calculate(data) {
        let cost = (data.miles / data.mpg) * data.fuelCost;

        let result = {
            fuelCost: cost,
            vehicle: this.data.vehicle
        }

        return result;
    }// calculate

    displayModal(data) {
        let modalEl = document.getElementById('fuel-cost-modal-wrapper');

        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = 'fuel-cost-modal-wrapper';
            modalEl.innerHTML = `
                <div id="fuel-cost-modal">
                    <div id="fuel-cost-modal-header">
                        <span>Estimated Fuel Cost</span>
                        <span id="fuel-cost-modal-close">x</span>
                    </div>
                    <div id="fuel-cost-modal-body">
                        <p>${data.vehicle}: $${data.fuelCost}</p>
                    </div>
                </div>`;
            document.body.appendChild(modalEl);

            document.getElementById('fuel-cost-modal-close').addEventListener('click', () => {
                this.modalClose();
            })
        } else {
            modalEl.classList.remove('hidden');
        }
    }// displayModal

    getData() {
        return this.data;
    }

    getForm() {
        let formEl = document.createElement('form');
        formEl.id = 'fuel-cost-form';
        formEl.innerHTML = 
            `
                <fieldset id="general-info">
                    <h3>Enter Vehicle Info</h3>
                    <div class="field">
                        <label for="vehicle">Vehicle</label>
                        <input id="vehicle" name="vehicle" placeholder="Civic" type="text" />
                    </div>

                    <div class="field">
                        <label for="miles">Annual Mileage</label>
                        <input id="miles" min="1" name="miles" placeholder="10000" type="number" required />
                    </div>

                    <div class="field">
                        <label for="fuel-cost">Cost per gallon of gas</label>
                        <input id="fuel-cost" min="1" name="fuel-cost" step="any" type="number" placeholder="5" required />
                    </div>

                    <div class="field">
                        <label for="mpg">Fuel Efficiency (miles per gallon)</label>
                        <input id="mpg" min="1" name="mpg" placeholder="20" type="number" required />
                    </div>
                </fieldset>

                <fieldset class="hidden" id="vehicle-2-info">
                    <h3>Vehicle 2</h3>
                    <div class="field">
                        <label for="mpg-2">Fuel Efficiency (miles per gallon)</label>
                        <input id="mpg-2" min="1" name="mpg-2" placeholder="20" type="number" />
                    </div>
                </fieldset>

                <input id="fuel-cost-submit" type="submit" value="Submit" />
        `;

        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formEl);

            this.data.fuelCost = Number(formData.get('fuel-cost'));
            this.data.miles = Number(formData.get('miles'));
            this.data.mpg = Number(formData.get('mpg'));
            this.data.vehicle = formData.get('vehicle');

            const result = this.calculate(this.data);
            
            this.displayModal(result);
        });

        return formEl;
    }// getForm

    modalClose() {
        let modal = document.getElementById('fuel-cost-modal-wrapper');
        
        if (!modal) {
            alert('no modal found');
        } else {
            modal.classList.add('hidden');
        }
    }
}

const calculator = new GasCostCalculator();

const contentContainer = document.getElementById('fuel-cost-container');

contentContainer.appendChild(calculator.getForm());